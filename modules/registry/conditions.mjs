import {MODULE_ID} from "../_moduleId.mjs";

export function registerConditions(registry) {
    registry.tracks.push("wounded")

    registry.register(MODULE_ID, "wtGrazed", {
        name: "PF1WT.WoundThresholdsGrazed",
        texture: "modules/pf1e-wound-thresholds/icons/conditions/open-wound.svg",
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
    })

    registry.register(MODULE_ID, "wtWounded", {
        name: "PF1WT.WoundThresholdsWounded",
        texture: "modules/pf1e-wound-thresholds/icons/conditions/ragged-wound.svg",
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
    })

    registry.register(MODULE_ID, "wtCritical", {
        name: "PF1WT.WoundThresholdsCritical",
        texture: "modules/pf1e-wound-thresholds/icons/conditions/bloody-stash.svg",
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
    })
}