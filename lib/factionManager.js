import * as commLib from '/lib/commLib.js'
/** @type import("..").NS */
var ns
export async function main(_ns) {
    ns = _ns
    commLib.initialize(ns);
    var factions = commLib.getFactions()
    var playerData = commLib.getPlayerData()
    if (factions == undefined) {
        factions = {}
    }
    if (playerData.completedFactions == undefined) {
        playerData.completedFactions = {}
    }
    playerData.ownedAugmentations = ns.singularity.getOwnedAugmentations(true)
    for (var faction of ns.singularity.checkFactionInvitations()) {
        if (factions[faction] == undefined) {
            factions[faction] = {}
        }
    }
    for (var [faction,_] of Object.entries(factions)) {
        factions[faction].augmentations = ns.singularity.getAugmentationsFromFaction(faction)
        for (var aug of factions[faction].augmentations) {
            factions[faction].availableAugmentations = {}
            if (!playerData.ownedAugmentations.includes(aug)) {
                factions[faction].availableAugmentations[aug] = ns.singularity.getAugmentationStats(aug)
            }
            if (Object.entries(factions[faction].availableAugmentations).length == 0) {
                playerData.completedFactions[faction] = true
            }
        }
    }
    ns.tprint(factions)
    commLib.setFactions(factions)
}