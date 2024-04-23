export function registerConditions() {
    pf1.config.conditions = Object.assign(pf1.config.conditions, {
        wtGrazed: game.i18n.localize("PF1WT.WoundThresholdsGrazed"),
        wtWounded: game.i18n.localize("PF1WT.WoundThresholdsWounded"),
        wtCritical: game.i18n.localize("PF1WT.WoundThresholdsCritical"),
    });

    pf1.config.conditionMechanics = Object.assign(pf1.config.conditionMechanics, {
        wtGrazed: {
            changes: [
                {
                    formula: -2,
                    subTarget: "attack",
                    modifier: "penalty"
                },
                {
                    formula: -2,
                    subTarget: "allSavingThrows",
                    modifier: "penalty"
                },
                {
                    formula: -2,
                    subTarget: "skills",
                    modifier: "penalty",
                },
                {
                    formula: -2,
                    subTarget: "allChecks",
                    modifier: "penalty",
                },
                {
                    formula: -2,
                    subTarget: "ac",
                    modifier: "penalty",
                },
                {
                    formula: 0,
                    subTarget: "cl",
                    modifier: "penalty",
                },
            ]
        },
        wtWounded: {
            changes: [
                {
                    formula: -4,
                    subTarget: "attack",
                    modifier: "penalty"
                },
                {
                    formula: -4,
                    subTarget: "allSavingThrows",
                    modifier: "penalty"
                },
                {
                    formula: -4,
                    subTarget: "skills",
                    modifier: "penalty",
                },
                {
                    formula: -4,
                    subTarget: "allChecks",
                    modifier: "penalty",
                },
                {
                    formula: -4,
                    subTarget: "ac",
                    modifier: "penalty",
                },
                {
                    formula: -1,
                    subTarget: "cl",
                    modifier: "penalty",
                },
            ]
        },
        wtCritical: {
            changes: [
                {
                    formula: -6,
                    subTarget: "attack",
                    modifier: "penalty"
                },
                {
                    formula: -6,
                    subTarget: "allSavingThrows",
                    modifier: "penalty"
                },
                {
                    formula: -6,
                    subTarget: "skills",
                    modifier: "penalty",
                },
                {
                    formula: -6,
                    subTarget: "allChecks",
                    modifier: "penalty",
                },
                {
                    formula: -6,
                    subTarget: "ac",
                    modifier: "penalty",
                },
                {
                    formula: -2,
                    subTarget: "cl",
                    modifier: "penalty",
                },
            ]
        }
    });

    pf1.config.conditionTracks.wounded = ["wtGrazed", "wtWounded", "wtCritical"];

    pf1.config.conditionTextures = Object.assign(pf1.config.conditionTextures, {
        wtGrazed: "modules/pf1e-wound-thresholds/icons/conditions/wtGrazed.png",
        wtWounded: "modules/pf1e-wound-thresholds/icons/conditions/wtWounded.png",
        wtCritical: "modules/pf1e-wound-thresholds/icons/conditions/wtCritical.png",
    });
}