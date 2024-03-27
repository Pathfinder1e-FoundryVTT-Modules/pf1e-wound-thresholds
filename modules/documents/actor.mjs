export function toggleWoundThresholds(document, changes, options, userId) {
    const vigorChanged = changes?.system?.attributes?.vigor;
    const woundsChanged = changes?.system?.attributes?.wounds;

    if (!vigorChanged && !woundsChanged) return;

    if (vigorChanged) {
        if (vigorChanged.value <= 0) {
            changes["system.attributes.conditions.fatigued"] = true;
        }
    }

    if (woundsChanged) {
        const newWoundsValue = woundsChanged.value;
        const woundsTotal = document.system.attributes.wounds.max;
        const woundPercentage = newWoundsValue / woundsTotal;

        if (woundPercentage <= 0) {
            // Dead
            changes["system.attributes.conditions.-=wtGrazed"] = null;
            changes["system.attributes.conditions.-=wtWounded"] = null;
            changes["system.attributes.conditions.-=wtCritical"] = null;
        } else if (woundPercentage <= 0.5) {
            if (!document.system.attributes.conditions.wtCritical) {
                // Critical
                changes["system.attributes.conditions.wtCritical"] = true;
                changes["system.attributes.conditions.staggered"] = true;
                changes["system.attributes.conditions.-=wtWounded"] = null;
                changes["system.attributes.conditions.-=wtGrazed"] = null;
            }
        } else if (woundPercentage <= 0.75) {
            if (!document.system.attributes.conditions.wtWounded) {
                // Wounded
                changes["system.attributes.conditions.wtWounded"] = true;
                changes["system.attributes.conditions.-=wtCritical"] = null;
                changes["system.attributes.conditions.-=wtGrazed"] = null;
            }
        } else if (woundPercentage < 1) {
            if (!document.system.attributes.conditions.wtGrazed) {
                // Grazed
                changes["system.attributes.conditions.wtGrazed"] = true;
                changes["system.attributes.conditions.-=wtWounded"] = null;
                changes["system.attributes.conditions.-=wtCritical"] = null;
            }
        } else {
            changes["system.attributes.conditions.-=wtGrazed"] = null;
            changes["system.attributes.conditions.-=wtWounded"] = null;
            changes["system.attributes.conditions.-=wtCritical"] = null;
        }
    }
}

export function recoverWoundPoints(actor, options, updateData, itemUpdates) {
    if (!options.restoreHealth) {
        return;
    }

    let updates = {
        "system.attributes.vigor.value": actor.system.attributes.vigor.max
    };

    let woundPointsRestore = 0;
    if (options.hours >= 24) {
        woundPointsRestore = Math.floor(actor.system.attributes.hd.total / 2)
    } else if (options.hours >= 8) {
        woundPointsRestore = 1;
    }

    if (options.longTermCare) {
        woundPointsRestore *= 2;
    }

    updates["system.attributes.wounds.value"] = Math.min(actor.system.attributes.wounds.max, actor.system.attributes.wounds.value + woundPointsRestore);
    actor.update(updates);
}

export function extendActorTemplate(ActorTemplate) {
    return class WoundThresholdsActorTemplate extends ActorTemplate {
        async modifyTokenAttribute(attribute, value, isDelta = false, isBar = true) {
            if (attribute !== "attributes.vigor") {
                return super.modifyTokenAttribute(attribute, value, isDelta, isBar);
            }

            let doc = this;
            const vigor = this.system.attributes.vigor,
                wounds = this.system.attributes.wounds,
                updates = {};

            if (!isDelta) value = (vigor.temp + vigor.value - value) * -1;
            let tempDamage = value;
            if (vigor.temp > 0 && value < 0) {
                tempDamage = Math.min(0, vigor.temp + value);
                updates["system.attributes.vigor.temp"] = Math.max(0, vigor.temp + value);
            }

            if ((vigor.value + tempDamage) < 0) {
                // Apply overdamage to wounds instead
                let woundDamage = Math.abs(vigor.value + tempDamage);
                updates["system.attributes.wounds.value"] = wounds.value - woundDamage;
                tempDamage = -vigor.value;
            }

            updates["system.attributes.vigor.value"] = Math.min(vigor.value + tempDamage, vigor.max);

            const allowed = Hooks.call("modifyTokenAttribute", {attribute, value, isDelta, isBar}, updates);
            return allowed !== false ? doc.update(updates) : this;
        }
    }
}