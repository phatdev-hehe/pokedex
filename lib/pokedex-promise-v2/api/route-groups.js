/* eslint-disable perfectionist/sort-objects */

export default {
  pokemon: {
    pokemon: {
      rootEndpoint:
        // https://github.com/PokeAPI/pokedex-promise-v2/blob/405c7fd1bce0f1201ffda7b543f790e79e1b352e/src/utils/RootEndpoints.ts
        "getPokemonsList",
      endpoint:
        // https://github.com/PokeAPI/pokedex-promise-v2/blob/405c7fd1bce0f1201ffda7b543f790e79e1b352e/src/utils/Endpoints.ts
        "getPokemonByName",
    },
    ability: {
      rootEndpoint: "getAbilitiesList",
    },
    characteristic: {
      rootEndpoint: "getCharacteristicsList",
    },
    "egg-group": {
      rootEndpoint: "getEggGroupsList",
    },
    gender: {
      rootEndpoint: "getGendersList",
    },
    "growth-rate": {
      rootEndpoint: "getGrowthRatesList",
    },
    nature: {
      rootEndpoint: "getNaturesList",
    },
    "pokeathlon-stat": {
      rootEndpoint: "getPokeathlonStatsList",
    },
    "pokemon-color": {
      rootEndpoint: "getPokemonColorsList",
    },
    "pokemon-form": {
      rootEndpoint: "getPokemonFormsList",
    },
    "pokemon-habitat": {
      rootEndpoint: "getPokemonHabitatsList",
    },
    "pokemon-shape": {
      rootEndpoint: "getPokemonShapesList",
    },
    "pokemon-species": {
      rootEndpoint: "getPokemonSpeciesList",
    },
    stat: {
      rootEndpoint: "getStatsList",
    },
    type: {
      rootEndpoint: "getTypesList",
    },
  },
  berries: {
    berry: {
      rootEndpoint: "getBerriesList",
    },
    "berry-firmness": {
      rootEndpoint: "getBerriesFirmnessList",
    },
    "berry-flavor": {
      rootEndpoint: "getBerriesFlavorsList",
    },
  },
  contests: {
    "contest-type": {
      rootEndpoint: "getContestTypesList",
    },
    "contest-effect": {
      rootEndpoint: "getContestEffectsList",
    },
    "super-contest-effect": {
      rootEndpoint: "getSuperContestEffectsList",
    },
  },
  encounters: {
    "encounter-method": {
      rootEndpoint: "getEncounterMethodsList",
    },
    "encounter-condition": {
      rootEndpoint: "getEncounterConditionsList",
    },
    "encounter-condition-value": {
      rootEndpoint: "getEncounterConditionValuesList",
    },
  },
  evolution: {
    "evolution-chain": {
      rootEndpoint: "getEvolutionChainsList",
    },
    "evolution-trigger": {
      rootEndpoint: "getEvolutionTriggersList",
    },
  },
  games: {
    generation: {
      rootEndpoint: "getGenerationsList",
    },
    pokedex: {
      rootEndpoint: "getPokedexList",
    },
    version: {
      rootEndpoint: "getVersionsList",
    },
    "version-group": {
      rootEndpoint: "getVersionGroupsList",
    },
  },
  items: {
    item: {
      rootEndpoint: "getItemsList",
    },
    "item-attribute": {
      rootEndpoint: "getItemAttributesList",
    },
    "item-category": {
      rootEndpoint: "getItemCategoriesList",
    },
    "item-fling-effect": {
      rootEndpoint: "getItemFlingEffectsList",
    },
    "item-pocket": {
      rootEndpoint: "getItemPocketsList",
    },
  },
  locations: {
    location: {
      rootEndpoint: "getLocationsList",
    },
    "location-area": {
      rootEndpoint: "getLocationAreasList",
    },
    "pal-park-area": {
      rootEndpoint: "getPalParkAreasList",
    },
    region: {
      rootEndpoint: "getRegionsList",
    },
  },
  machines: {
    machine: {
      rootEndpoint: "getMachinesList",
    },
  },
  moves: {
    move: {
      rootEndpoint: "getMovesList",
    },
    "move-ailment": {
      rootEndpoint: "getMoveAilmentsList",
    },
    "move-battle-style": {
      rootEndpoint: "getMoveBattleStylesList",
    },
    "move-category": {
      rootEndpoint: "getMoveCategoriesList",
    },
    "move-damage-class": {
      rootEndpoint: "getMoveDamageClassesList",
    },
    "move-learn-method": {
      rootEndpoint: "getMoveLearnMethodsList",
    },
    "move-target": {
      rootEndpoint: "getMoveTargetsList",
    },
  },
  utility: {
    language: {
      rootEndpoint: "getLanguagesList",
    },
  },
};
