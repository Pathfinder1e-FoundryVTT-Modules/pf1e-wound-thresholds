export function highlightWoundThresholds(sheet, [html], data) {
    const input = html.querySelector(`[name="system.attributes.wounds.value"]`);
    const onChange = () => {
        const woundTotal = data.system.attributes.wounds.max;
        const woundPercentage = data.system.attributes.wounds.value / woundTotal;

        let state = null;
        if (woundPercentage <= 0) {
            state = "dead";
        } else if (woundPercentage <= 0.5) {
            state = "critical";
        } else if (woundPercentage <= 0.75) {
            state = "wounded";
        } else if (woundPercentage < 1) {
            state = "grazed";
        }

        if (input) {
            const parentNode = input.parentNode;
            parentNode.classList.remove("wt-dead", "wt-critical", "wt-wounded", "wt-grazed");
            if (state) {
                parentNode.classList.add(`wt-${state}`);
            }
        }
    }
    input.addEventListener("change", onChange);
    onChange()
}

export function highlightVigorThresholds(sheet, [html], data) {
    const input = html.querySelector(`[name="system.attributes.vigor.value"]`);
    const onChange = () => {
        let state = null;
        if (data.system.attributes.vigor.value === 0) {
            state = "grazed";
        }

        if (input) {
            const parentNode = input.parentNode;
            parentNode.classList.remove("wt-grazed");
            if (state) {
                parentNode.classList.add(`wt-${state}`);
            }
        }
    }
    input.addEventListener("change", onChange);
    onChange()
}

export function toggleWoundThresholds(document, changes, options, userId) {
    const vigorChanged = changes?.system?.attributes?.vigor;
    const woundsChanged = changes?.system?.attributes?.wounds;

    if (!vigorChanged && !woundsChanged) return;

    if (vigorChanged) {
        const newVigorValue = (vigorChanged.value || (document.system.attributes.vigor.max + vigorChanged.offset));
        if (newVigorValue <= 0) {
            document.setConditions({"fatigued": true});
        }
    }

    if (woundsChanged) {
        const newWoundsValue = (woundsChanged.value || (document.system.attributes.wounds.max + woundsChanged.offset));
        const woundsTotal = woundsChanged.total || document.system.attributes.wounds.max;

        const woundPercentage = newWoundsValue / woundsTotal;

        if (woundPercentage <= 0) {
            document.setConditions({
                wtGrazed: false,
                wtWounded: false,
                wtCritical: false
            })
        } else if (woundPercentage <= 0.5) {
            if (!document.system.conditions.wtCritical) {
                document.setConditions({
                    wtGrazed: false,
                    wtWounded: false,
                    wtCritical: true,
                    staggered: true
                })
            }
        } else if (woundPercentage <= 0.75) {
            if (!document.system.conditions.wtWounded) {
                document.setConditions({
                    wtGrazed: false,
                    wtWounded: true,
                    wtCritical: false,
                })
            }
        } else if (woundPercentage < 1) {
            if (!document.system.conditions.wtGrazed) {
                document.setConditions({
                    wtGrazed: true,
                    wtWounded: false,
                    wtCritical: false,
                })
            }
        } else {
            document.setConditions({
                wtGrazed: false,
                wtWounded: false,
                wtCritical: false
            })
        }
    }

    console.log(document, changes)
}