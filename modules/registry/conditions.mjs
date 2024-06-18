export function registerConditions() {
    pf1.registry.conditions.tracks.push("wounded")
    pf1.registry.conditions.set("wtGrazed", new pf1.registry.Condition({
        _id: "wtGrazed",
        namespace: "pf1wt",
        name: "PF1WT.WoundThresholdsGrazed",
        texture: "modules/pf1e-wound-thresholds/icons/conditions/wtGrazed.png",
        journal: null,
        showInAction: true,
        showInDefense: true,
        mechanics: {
            changes: [
                {
                    formula: -2,
                    target: "attack",
                    modifier: "penalty"
                },
                {
                    formula: -2,
                    target: "allSavingThrows",
                    modifier: "penalty"
                },
                {
                    formula: -2,
                    target: "skills",
                    modifier: "penalty",
                },
                {
                    formula: -2,
                    target: "allChecks",
                    modifier: "penalty",
                },
                {
                    formula: -2,
                    target: "ac",
                    modifier: "penalty",
                }
            ]
        },
        track: "wounded"
    }))
    pf1.registry.conditions.set("wtWounded", new pf1.registry.Condition({
        _id: "wtWounded",
        namespace: "pf1wt",
        name: "PF1WT.WoundThresholdsWounded",
        texture: "modules/pf1e-wound-thresholds/icons/conditions/wtWounded.png",
        journal: null,
        showInAction: true,
        showInDefense: true,
        mechanics: {
            changes: [
                {
                    formula: -4,
                    target: "attack",
                    modifier: "penalty"
                },
                {
                    formula: -4,
                    target: "allSavingThrows",
                    modifier: "penalty"
                },
                {
                    formula: -4,
                    target: "skills",
                    modifier: "penalty",
                },
                {
                    formula: -4,
                    target: "allChecks",
                    modifier: "penalty",
                },
                {
                    formula: -4,
                    target: "ac",
                    modifier: "penalty",
                },
                {
                    formula: -2,
                    target: "cl",
                    modifier: "penalty",
                },
            ]
        },
        track: "wounded"
    }))
    pf1.registry.conditions.set("wtCritical", new pf1.registry.Condition({
        _id: "wtCritical",
        namespace: "pf1wt",
        name: "PF1WT.WoundThresholdsCritical",
        texture: "modules/pf1e-wound-thresholds/icons/conditions/wtCritical.png",
        journal: null,
        showInAction: true,
        showInDefense: true,
        mechanics: {
            changes: [
                {
                    formula: -6,
                    target: "attack",
                    modifier: "penalty"
                },
                {
                    formula: -6,
                    target: "allSavingThrows",
                    modifier: "penalty"
                },
                {
                    formula: -6,
                    target: "skills",
                    modifier: "penalty",
                },
                {
                    formula: -6,
                    target: "allChecks",
                    modifier: "penalty",
                },
                {
                    formula: -6,
                    target: "ac",
                    modifier: "penalty",
                },
                {
                    formula: -4,
                    target: "cl",
                    modifier: "penalty",
                },
            ]
        },
        track: "wounded"
    }))
}