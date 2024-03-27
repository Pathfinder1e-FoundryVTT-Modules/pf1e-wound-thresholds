import {extendToken} from "./canvas/token.mjs";
import {extendActorTemplate, recoverWoundPoints, toggleWoundThresholds} from "./documents/actor.mjs";
import {registerConditions} from "./registry/conditions.mjs";

Hooks.once("pf1PostInit", () => {
    pf1.canvas.TokenPF = extendToken(pf1.canvas.TokenPF);
    CONFIG.Token.objectClass = extendToken(CONFIG.Token.objectClass);

    pf1.documents.actor = Object.assign(pf1.documents.actor, {
        ActorBasePF: extendActorTemplate(pf1.documents.actor.ActorBasePF),
        ActorCharacterPF: extendActorTemplate(pf1.documents.actor.ActorCharacterPF),
        ActorNPCPF: extendActorTemplate(pf1.documents.actor.ActorNPCPF),
        ActorPF: extendActorTemplate(pf1.documents.actor.ActorPF)
    });

    CONFIG.Actor.documentClasses = Object.assign(CONFIG.Actor.documentClasses, {
        basic: extendActorTemplate(CONFIG.Actor.documentClasses.basic),
        character: extendActorTemplate(CONFIG.Actor.documentClasses.character),
        npc: extendActorTemplate(CONFIG.Actor.documentClasses.npc)
    })

    registerConditions();
});

Hooks.on("preUpdateActor", toggleWoundThresholds)
Hooks.on("pf1ActorRest", recoverWoundPoints);