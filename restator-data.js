var characs = {
    "life": {
        "min":100,
        "value":0,
        "capital":0,
        "name":"vie"
    },
    "strength": {
        "min":0,
        "value":0,
        "capital":0,
        "name":"force"
    },
    "wisdom": {
        "min":0,
        "value":0,
        "capital":0,
        "name":"sagesse"
    },
    "agility": {
        "min":0,
        "value":0,
        "capital":0,
        "name":"agileté"
    },
    "resistance": {
        "min":0,
        "value":0,
        "capital":0,
        "name":"résistance"
    },
    "science": {
        "min":0,
        "value":0,
        "capital":0,
        "name":"science"
    },
    "magic": {
        "min":0,
        "value":0,
        "capital":0,
        "name":"magie"
    },
    "frequency": {
        "min":100,
        "value":0,
        "capital":0,
        "name":"fréquence"
    },
    "tp": {
        "min":10,
        "value":0,
        "capital":0,
        "name":"TP"
    },
    "mp": {
        "min":3,
        "value":0,
        "capital":0,
        "name":"MP"
    }
};

var costs = {
    "life": [
            {"step" : 0, "capital" : 1, "sup" : 4},
            {"step" : 1000, "capital" : 1, "sup" : 3},
            {"step" : 2000, "capital" : 1, "sup" : 2},
        ],
    "strength": [
            {"step" : 0, "capital" : 1, "sup" : 2},
            {"step" : 200, "capital" : 1, "sup" : 1},
            {"step" : 400, "capital" : 2, "sup" : 1},
            {"step" : 600, "capital" : 3, "sup" : 1},
        ],
    "wisdom": [
            {"step" : 0, "capital" : 1, "sup" : 2},
            {"step" : 200, "capital" : 1, "sup" : 1},
            {"step" : 400, "capital" : 2, "sup" : 1},
            {"step" : 600, "capital" : 3, "sup" : 1},
        ],
    "agility": [
            {"step" : 0, "capital" : 1, "sup" : 2},
            {"step" : 200, "capital" : 1, "sup" : 1},
            {"step" : 400, "capital" : 2, "sup" : 1},
            {"step" : 600, "capital" : 3, "sup" : 1},
        ],
    "resistance": [
            {"step" : 0, "capital" : 1, "sup" : 2},
            {"step" : 200, "capital" : 1, "sup" : 1},
            {"step" : 400, "capital" : 2, "sup" : 1},
            {"step" : 600, "capital" : 3, "sup" : 1},
        ],
    "science": [
            {"step" : 0, "capital" : 1, "sup" : 2},
            {"step" : 200, "capital" : 1, "sup" : 1},
            {"step" : 400, "capital" : 2, "sup" : 1},
            {"step" : 600, "capital" : 3, "sup" : 1},
        ],
    "magic": [
            {"step" : 0, "capital" : 1, "sup" : 2},
            {"step" : 200, "capital" : 1, "sup" : 1},
            {"step" : 400, "capital" : 2, "sup" : 1},
            {"step" : 600, "capital" : 3, "sup" : 1},
        ],
    "frequency": [
            {"step" : 0, "capital" : 1, "sup" : 1}
        ],
    "tp": [
            {"step" : 0, "capital" : 30, "sup" : 1}, {"step" : 1, "capital" : 35, "sup" : 1},
            {"step" : 2, "capital" : 40, "sup" : 1}, {"step" : 3, "capital" : 45, "sup" : 1},
            {"step" : 4, "capital" : 50, "sup" : 1}, {"step" : 5, "capital" : 55, "sup" : 1},
            {"step" : 6, "capital" : 60, "sup" : 1}, {"step" : 7, "capital" : 65, "sup" : 1},
            {"step" : 8, "capital" : 70, "sup" : 1}, {"step" : 9, "capital" : 75, "sup" : 1},
            {"step" : 10, "capital" : 80, "sup" : 1}, {"step" : 11, "capital" : 85, "sup" : 1},
            {"step" : 12, "capital" : 90, "sup" : 1}, {"step" : 13, "capital" : 95, "sup" : 1},
            {"step" : 14, "capital" : 100, "sup" : 1}
        ],
    "mp": [
            {"step" : 0, "capital" : 20, "sup" : 1},
            {"step" : 1, "capital" : 30, "sup" : 1},
            {"step" : 2, "capital" : 40, "sup" : 1},
            {"step" : 3, "capital" : 50, "sup" : 1},
            {"step" : 4, "capital" : 60, "sup" : 1},
            {"step" : 5, "capital" : 70, "sup" : 1},
            {"step" : 6, "capital" : 80, "sup" : 1},
            {"step" : 7, "capital" : 90, "sup" : 1},
            {"step" : 8, "capital" : 100, "sup" : 1}
        ]
};

var color = "green";

/*
 * weapons est copié de
 * https://leekwars.com/api/weapon/get-all
 *
 * Structure :
 *     'id': { "id": id (int),
 *             "name": name (string),
 *             "level": level (int),
 *             "min_range": min (int),
 *             "max_range: max (int),
 *             "launch_type": type (int),
 *             "cost": cost (int),
 *             "area": area (int),
 *             "los": los (int),
 *             "template": templ (int),
 *             "effects" : effect (array)
 *           }
 * Pour les effets, chaque élement du tableau est :
 *    {"id": id (int),
 *     "type": ty (int),
 *     "value1": v1 (int),
 *     "value2": v2 (int),
 *     "turns": t (int),
 *     "targets": tar (int)
 *    }
 *
 */
var weapons = {"37":{"id":37,"name":"pistol","level":1,"min_range":1,"max_range":7,"launch_type":1,"effects":[{"id":1,"value1":15,"value2":5,"turns":0,"targets":31,"type":1}],"cost":3,"area":1,"los":1,"template":1},"38":{"id":38,"name":"machine_gun","level":5,"min_range":1,"max_range":6,"launch_type":0,"effects":[{"id":1,"value1":30,"value2":5,"turns":0,"targets":31,"type":1}],"cost":4,"area":1,"los":1,"template":2},"39":{"id":39,"name":"double_gun","level":9,"min_range":2,"max_range":7,"launch_type":1,"effects":[{"id":1,"value1":18,"value2":7,"turns":0,"targets":31,"type":1},{"id":1,"value1":5,"value2":3,"turns":0,"targets":31,"type":1}],"cost":4,"area":1,"los":1,"template":3},"41":{"id":41,"name":"shotgun","level":17,"min_range":1,"max_range":5,"launch_type":0,"effects":[{"id":1,"value1":33,"value2":10,"turns":0,"targets":31,"type":1}],"cost":5,"area":1,"los":1,"template":4},"45":{"id":45,"name":"magnum","level":27,"min_range":1,"max_range":8,"launch_type":1,"effects":[{"id":1,"value1":25,"value2":15,"turns":0,"targets":31,"type":1}],"cost":5,"area":1,"los":1,"template":5},"108":{"id":108,"name":"broadsword","level":30,"min_range":1,"max_range":1,"launch_type":1,"effects":[{"id":1,"value1":39,"value2":2,"turns":0,"targets":31,"type":1},{"id":18,"value1":0.4,"value2":0.1,"turns":1,"targets":31,"type":9}],"cost":5,"area":1,"los":1,"template":15},"42":{"id":42,"name":"laser","level":40,"min_range":2,"max_range":7,"launch_type":0,"effects":[{"id":1,"value1":43,"value2":16,"turns":0,"targets":31,"type":1}],"cost":6,"area":2,"los":1,"template":6},"46":{"id":46,"name":"flame_thrower","level":90,"min_range":2,"max_range":8,"launch_type":0,"effects":[{"id":1,"value1":35,"value2":5,"turns":0,"targets":31,"type":1},{"id":13,"value1":24,"value2":6,"turns":2,"targets":31,"type":7}],"cost":6,"area":2,"los":1,"template":8},"43":{"id":43,"name":"grenade_launcher","level":99,"min_range":4,"max_range":7,"launch_type":1,"effects":[{"id":1,"value1":45,"value2":8,"turns":0,"targets":31,"type":1}],"cost":6,"area":4,"los":1,"template":7},"40":{"id":40,"name":"destroyer","level":109,"min_range":1,"max_range":6,"launch_type":1,"effects":[{"id":1,"value1":40,"value2":20,"turns":0,"targets":31,"type":1},{"id":19,"value1":12,"value2":0,"turns":2,"targets":31,"type":9}],"cost":6,"area":1,"los":1,"template":9},"109":{"id":109,"name":"axe","level":110,"min_range":1,"max_range":1,"launch_type":1,"effects":[{"id":1,"value1":44,"value2":33,"turns":0,"targets":31,"type":1},{"id":17,"value1":0.5,"value2":0.1,"turns":1,"targets":31,"type":9}],"cost":6,"area":1,"los":1,"template":16},"60":{"id":60,"name":"b_laser","level":170,"min_range":2,"max_range":8,"launch_type":0,"effects":[{"id":1,"value1":50,"value2":10,"turns":0,"targets":31,"type":1},{"id":2,"value1":50,"value2":10,"turns":0,"targets":31,"type":2}],"cost":5,"area":2,"los":1,"template":13},"44":{"id":44,"name":"electrisor","level":211,"min_range":7,"max_range":7,"launch_type":1,"effects":[{"id":1,"value1":70,"value2":10,"turns":0,"targets":31,"type":1}],"cost":7,"area":3,"los":1,"template":11},"48":{"id":48,"name":"gazor","level":215,"min_range":2,"max_range":7,"launch_type":0,"effects":[{"id":13,"value1":27,"value2":5,"turns":3,"targets":31,"type":7}],"cost":7,"area":5,"los":1,"template":10},"107":{"id":107,"name":"katana","level":257,"min_range":1,"max_range":1,"launch_type":1,"effects":[{"id":1,"value1":77,"value2":0,"turns":0,"targets":31,"type":1},{"id":19,"value1":20,"value2":0,"turns":1,"targets":31,"type":9},{"id":17,"value1":0.2,"value2":0.1,"turns":1,"targets":31,"type":9},{"id":18,"value1":0.2,"value2":0.1,"turns":1,"targets":31,"type":9}],"cost":7,"area":1,"los":1,"template":14},"47":{"id":47,"name":"m_laser","level":300,"min_range":4,"max_range":12,"launch_type":0,"effects":[{"id":1,"value1":90,"value2":10,"turns":0,"targets":31,"type":1}],"cost":8,"area":2,"los":1,"template":12}};

let weaponsName = {
    "axe": "Hache",
    "b_laser": "B-Laser",
    "broadsword": "Glaive",
    "destroyer": "Destroyer",
    "double_gun": "Double gun",
    "electrisor": "Électriseur",
    "flame_thrower": "Lance-flammes",
    "gazor": "Gazeur",
    "grenade_launcher": "Lance-grenades",
    "katana": "Katana",
    "laser": "Laser",
    "machine_gun": "Machine gun",
    "magnum": "Magnum",
    "m_laser": "M-Laser",
    "pistol": "Pistolet",
    "shotgun": "Fusil à pompe"
}

for (w in weapons)
    weapons[w].nameFr = weaponsName[weapons[w].name];


/*
 * chips est copié de
 * https://leekwars.com/api/chip/get-all
 *
 * Structure :
 *     'id': { "id": id (int),
 *             "name": name (string),
 *             "level": level (int),
 *             "min_range": min (int),
 *             "max_range: max (int),
 *             "launch_type": type (int),
 *             "cost": cost (int),
 *             "area": area (int),
 *             "cooldown": cool (int),
 *             "team_cooldown": tcool (int),
 *             "initial_cooldown": icool (int),
 *             "los": los (int),
 *             "template": templ (int),
 *             "effects" : effect (array)
 *           }
 * Pour les effets, chaque élement du tableau est :
 *    {"id": id (int),
 *     "type": ty (int),
 *     "value1": v1 (int),
 *     "value2": v2 (int),
 *     "turns": t (int),
 *     "targets": tar (int)
 *    }
 *
 */
var chips = {"1":{"id":1,"name":"shock","level":1,"min_range":0,"max_range":6,"launch_type":1,"effects":[{"id":1,"value1":5,"value2":2,"turns":0,"targets":31,"type":1}],"cost":2,"area":1,"cooldown":0,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":6},"19":{"id":19,"name":"pebble","level":4,"min_range":0,"max_range":5,"launch_type":1,"effects":[{"id":1,"value1":2,"value2":15,"turns":0,"targets":31,"type":1}],"cost":2,"area":1,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":12},"18":{"id":18,"name":"spark","level":7,"min_range":0,"max_range":10,"launch_type":1,"effects":[{"id":1,"value1":8,"value2":8,"turns":0,"targets":31,"type":1}],"cost":3,"area":1,"cooldown":0,"los":0,"team_cooldown":0,"initial_cooldown":0,"template":9},"2":{"id":2,"name":"ice","level":9,"min_range":0,"max_range":8,"launch_type":1,"effects":[{"id":1,"value1":17,"value2":2,"turns":0,"targets":31,"type":1}],"cost":4,"area":1,"cooldown":0,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":15},"3":{"id":3,"name":"bandage","level":10,"min_range":0,"max_range":6,"launch_type":1,"effects":[{"id":2,"value1":10,"value2":5,"turns":0,"targets":31,"type":2}],"cost":2,"area":1,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":1},"21":{"id":21,"name":"helmet","level":11,"min_range":0,"max_range":4,"launch_type":1,"effects":[{"id":6,"value1":15,"value2":0,"turns":2,"targets":30,"type":4}],"cost":3,"area":1,"cooldown":3,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":19},"7":{"id":7,"name":"rock","level":15,"min_range":2,"max_range":6,"launch_type":1,"effects":[{"id":1,"value1":30,"value2":1,"turns":0,"targets":31,"type":1}],"cost":5,"area":1,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":13},"4":{"id":4,"name":"cure","level":21,"min_range":0,"max_range":5,"launch_type":1,"effects":[{"id":2,"value1":35,"value2":8,"turns":0,"targets":31,"type":2}],"cost":4,"area":1,"cooldown":2,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":2},"6":{"id":6,"name":"flash","level":24,"min_range":1,"max_range":7,"launch_type":0,"effects":[{"id":1,"value1":19,"value2":5,"turns":0,"targets":31,"type":1}],"cost":4,"area":3,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":7},"20":{"id":20,"name":"shield","level":25,"min_range":0,"max_range":4,"launch_type":1,"effects":[{"id":6,"value1":20,"value2":0,"turns":3,"targets":30,"type":4}],"cost":4,"area":1,"cooldown":4,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":18},"5":{"id":5,"name":"flame","level":29,"min_range":2,"max_range":7,"launch_type":1,"effects":[{"id":1,"value1":25,"value2":2,"turns":0,"targets":31,"type":1}],"cost":4,"area":1,"cooldown":0,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":10},"97":{"id":97,"name":"venom","level":45,"min_range":1,"max_range":10,"launch_type":1,"effects":[{"id":13,"value1":15,"value2":5,"turns":3,"targets":31,"type":7}],"cost":4,"area":1,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":61},"9":{"id":9,"name":"stretching","level":47,"min_range":0,"max_range":5,"launch_type":1,"effects":[{"id":4,"value1":30,"value2":5,"turns":2,"targets":30,"type":3}],"cost":3,"area":1,"cooldown":3,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":27},"73":{"id":73,"name":"puny_bulb","level":52,"min_range":1,"max_range":3,"launch_type":1,"effects":[{"id":14,"value1":1,"value2":0,"turns":0,"targets":31,"type":8}],"cost":6,"area":1,"cooldown":4,"los":1,"team_cooldown":1,"initial_cooldown":0,"template":40},"8":{"id":8,"name":"protein","level":53,"min_range":0,"max_range":4,"launch_type":1,"effects":[{"id":3,"value1":30,"value2":5,"turns":2,"targets":30,"type":3},{"id":25,"value1":30,"value2":5,"turns":0,"targets":30,"type":0}],"cost":3,"area":1,"cooldown":3,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":24},"30":{"id":30,"name":"stalactite","level":55,"min_range":2,"max_range":7,"launch_type":1,"effects":[{"id":1,"value1":64,"value2":3,"turns":0,"targets":31,"type":1}],"cost":6,"area":1,"cooldown":3,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":16},"23":{"id":23,"name":"wall","level":57,"min_range":0,"max_range":3,"launch_type":1,"effects":[{"id":5,"value1":5,"value2":1,"turns":2,"targets":30,"type":4}],"cost":3,"area":1,"cooldown":3,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":21},"14":{"id":14,"name":"leather_boots","level":58,"min_range":0,"max_range":5,"launch_type":1,"effects":[{"id":7,"value1":0.4,"value2":0.1,"turns":2,"targets":30,"type":3}],"cost":3,"area":1,"cooldown":3,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":30},"10":{"id":10,"name":"drip","level":60,"min_range":2,"max_range":6,"launch_type":1,"effects":[{"id":2,"value1":35,"value2":5,"turns":0,"targets":31,"type":2}],"cost":5,"area":4,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":3},"15":{"id":15,"name":"motivation","level":64,"min_range":0,"max_range":5,"launch_type":1,"effects":[{"id":8,"value1":0.4,"value2":0.1,"turns":2,"targets":30,"type":3},{"id":26,"value1":6,"value2":0,"turns":2,"targets":26,"type":0}],"cost":3,"area":1,"cooldown":3,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":33},"98":{"id":98,"name":"toxin","level":74,"min_range":1,"max_range":7,"launch_type":1,"effects":[{"id":13,"value1":25,"value2":10,"turns":3,"targets":31,"type":7}],"cost":5,"area":3,"cooldown":3,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":62},"32":{"id":32,"name":"rockfall","level":77,"min_range":5,"max_range":7,"launch_type":1,"effects":[{"id":1,"value1":48,"value2":8,"turns":0,"targets":31,"type":1}],"cost":5,"area":4,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":14},"11":{"id":11,"name":"vaccine","level":80,"min_range":0,"max_range":6,"launch_type":1,"effects":[{"id":2,"value1":34,"value2":4,"turns":3,"targets":30,"type":2}],"cost":6,"area":1,"cooldown":3,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":5},"94":{"id":94,"name":"tranquilizer","level":82,"min_range":1,"max_range":8,"launch_type":1,"effects":[{"id":18,"value1":0.3,"value2":0.1,"turns":1,"targets":31,"type":9}],"cost":3,"area":1,"cooldown":0,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":57},"22":{"id":22,"name":"armor","level":85,"min_range":0,"max_range":4,"launch_type":1,"effects":[{"id":6,"value1":25,"value2":0,"turns":4,"targets":30,"type":4}],"cost":6,"area":1,"cooldown":5,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":20},"31":{"id":31,"name":"iceberg","level":87,"min_range":3,"max_range":5,"launch_type":0,"effects":[{"id":1,"value1":72,"value2":8,"turns":0,"targets":31,"type":1}],"cost":7,"area":4,"cooldown":3,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":17},"67":{"id":67,"name":"armoring","level":90,"min_range":0,"max_range":3,"launch_type":1,"effects":[{"id":12,"value1":25,"value2":5,"turns":0,"targets":31,"type":2}],"cost":5,"area":1,"cooldown":5,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":38},"34":{"id":34,"name":"liberation","level":93,"min_range":0,"max_range":6,"launch_type":1,"effects":[{"id":9,"value1":60,"value2":0,"turns":0,"targets":31,"type":5}],"cost":5,"area":1,"cooldown":5,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":36},"96":{"id":96,"name":"solidification","level":95,"min_range":0,"max_range":3,"launch_type":1,"effects":[{"id":21,"value1":50,"value2":10,"turns":3,"targets":30,"type":3}],"cost":6,"area":1,"cooldown":5,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":60},"92":{"id":92,"name":"slow_down","level":98,"min_range":1,"max_range":8,"launch_type":1,"effects":[{"id":17,"value1":0.3,"value2":0.1,"turns":1,"targets":31,"type":9}],"cost":3,"area":1,"cooldown":0,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":55},"76":{"id":76,"name":"rocky_bulb","level":105,"min_range":1,"max_range":3,"launch_type":1,"effects":[{"id":14,"value1":4,"value2":0,"turns":0,"targets":31,"type":8}],"cost":10,"area":1,"cooldown":5,"los":1,"team_cooldown":1,"initial_cooldown":0,"template":43},"102":{"id":102,"name":"ferocity","level":107,"min_range":1,"max_range":8,"launch_type":1,"effects":[{"id":3,"value1":60,"value2":10,"turns":2,"targets":22,"type":3}],"cost":5,"area":1,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":66},"89":{"id":89,"name":"loam","level":111,"min_range":1,"max_range":7,"launch_type":1,"effects":[{"id":12,"value1":35,"value2":5,"turns":0,"targets":22,"type":2}],"cost":4,"area":1,"cooldown":3,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":52},"110":{"id":110,"name":"antidote","level":111,"min_range":0,"max_range":4,"launch_type":1,"effects":[{"id":23,"value1":0,"value2":0,"turns":0,"targets":30,"type":5}],"cost":3,"area":1,"cooldown":4,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":70},"24":{"id":24,"name":"rampart","level":117,"min_range":2,"max_range":7,"launch_type":1,"effects":[{"id":5,"value1":7,"value2":1,"turns":3,"targets":30,"type":4}],"cost":5,"area":1,"cooldown":4,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":22},"88":{"id":88,"name":"whip","level":119,"min_range":2,"max_range":6,"launch_type":1,"effects":[{"id":8,"value1":0.7,"value2":0.1,"turns":2,"targets":22,"type":3}],"cost":4,"area":1,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":51},"35":{"id":35,"name":"regeneration","level":120,"min_range":0,"max_range":3,"launch_type":1,"effects":[{"id":2,"value1":200,"value2":0,"turns":0,"targets":31,"type":2}],"cost":8,"area":1,"cooldown":-1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":4},"28":{"id":28,"name":"reflexes","level":127,"min_range":0,"max_range":3,"launch_type":1,"effects":[{"id":4,"value1":40,"value2":5,"turns":3,"targets":30,"type":3}],"cost":7,"area":1,"cooldown":5,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":29},"95":{"id":95,"name":"soporific","level":129,"min_range":1,"max_range":6,"launch_type":1,"effects":[{"id":18,"value1":0.4,"value2":0.1,"turns":3,"targets":31,"type":9}],"cost":5,"area":4,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":58},"77":{"id":77,"name":"iced_bulb","level":131,"min_range":1,"max_range":2,"launch_type":1,"effects":[{"id":14,"value1":5,"value2":0,"turns":0,"targets":31,"type":8}],"cost":12,"area":1,"cooldown":5,"los":1,"team_cooldown":1,"initial_cooldown":0,"template":44},"100":{"id":100,"name":"thorn","level":132,"min_range":0,"max_range":3,"launch_type":1,"effects":[{"id":20,"value1":3,"value2":1,"turns":3,"targets":30,"type":6}],"cost":4,"area":4,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":64},"26":{"id":26,"name":"doping","level":135,"min_range":0,"max_range":5,"launch_type":1,"effects":[{"id":3,"value1":40,"value2":5,"turns":3,"targets":30,"type":3},{"id":25,"value1":40,"value2":5,"turns":0,"targets":30,"type":0}],"cost":7,"area":1,"cooldown":5,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":26},"81":{"id":81,"name":"carapace","level":142,"min_range":1,"max_range":6,"launch_type":1,"effects":[{"id":6,"value1":55,"value2":0,"turns":3,"targets":22,"type":4}],"cost":5,"area":1,"cooldown":2,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":48},"91":{"id":91,"name":"acceleration","level":143,"min_range":3,"max_range":8,"launch_type":1,"effects":[{"id":7,"value1":0.7,"value2":0.1,"turns":2,"targets":22,"type":3}],"cost":4,"area":1,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":54},"68":{"id":68,"name":"inversion","level":150,"min_range":1,"max_range":16,"launch_type":0,"effects":[{"id":11,"value1":0,"value2":0,"turns":0,"targets":31,"type":5},{"id":2,"value1":50,"value2":0,"turns":0,"targets":30,"type":2},{"id":26,"value1":20,"value2":0,"turns":1,"targets":29,"type":0}],"cost":4,"area":1,"cooldown":4,"los":1,"team_cooldown":0,"initial_cooldown":1,"template":39},"93":{"id":93,"name":"ball_and_chain","level":154,"min_range":1,"max_range":6,"launch_type":1,"effects":[{"id":17,"value1":0.4,"value2":0.1,"turns":3,"targets":31,"type":9}],"cost":5,"area":4,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":56},"17":{"id":17,"name":"rage","level":156,"min_range":0,"max_range":3,"launch_type":1,"effects":[{"id":8,"value1":0.5,"value2":0.1,"turns":3,"targets":14,"type":3},{"id":26,"value1":10,"value2":0,"turns":3,"targets":10,"type":0}],"cost":6,"area":1,"cooldown":5,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":35},"36":{"id":36,"name":"meteorite","level":160,"min_range":5,"max_range":9,"launch_type":1,"effects":[{"id":1,"value1":70,"value2":10,"turns":0,"targets":31,"type":1}],"cost":8,"area":4,"cooldown":3,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":11},"106":{"id":106,"name":"fracture","level":160,"min_range":1,"max_range":6,"launch_type":1,"effects":[{"id":19,"value1":20,"value2":5,"turns":2,"targets":31,"type":9},{"id":24,"value1":20,"value2":5,"turns":2,"targets":31,"type":9}],"cost":3,"area":1,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":59},"80":{"id":80,"name":"remission","level":169,"min_range":0,"max_range":7,"launch_type":1,"effects":[{"id":2,"value1":66,"value2":11,"turns":0,"targets":30,"type":2}],"cost":5,"area":1,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":47},"85":{"id":85,"name":"devil_strike","level":171,"min_range":0,"max_range":0,"launch_type":1,"effects":[{"id":1,"value1":25,"value2":0,"turns":0,"targets":31,"type":1},{"id":1,"value1":25,"value2":0,"turns":0,"targets":31,"type":1},{"id":1,"value1":25,"value2":0,"turns":0,"targets":31,"type":1},{"id":1,"value1":25,"value2":0,"turns":0,"targets":31,"type":1},{"id":1,"value1":25,"value2":0,"turns":0,"targets":31,"type":1}],"cost":6,"area":5,"cooldown":3,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":50},"75":{"id":75,"name":"healer_bulb","level":174,"min_range":1,"max_range":2,"launch_type":1,"effects":[{"id":14,"value1":3,"value2":0,"turns":0,"targets":31,"type":8}],"cost":14,"area":1,"cooldown":7,"los":1,"team_cooldown":1,"initial_cooldown":0,"template":42},"13":{"id":13,"name":"seven_league_boots","level":175,"min_range":0,"max_range":2,"launch_type":1,"effects":[{"id":7,"value1":0.5,"value2":0.1,"turns":3,"targets":14,"type":3}],"cost":6,"area":1,"cooldown":5,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":32},"29":{"id":29,"name":"fortress","level":177,"min_range":0,"max_range":3,"launch_type":1,"effects":[{"id":5,"value1":9,"value2":1,"turns":3,"targets":30,"type":4}],"cost":6,"area":1,"cooldown":4,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":23},"33":{"id":33,"name":"lightning","level":180,"min_range":2,"max_range":5,"launch_type":0,"effects":[{"id":1,"value1":35,"value2":12,"turns":0,"targets":27,"type":1}],"cost":4,"area":4,"cooldown":0,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":8},"103":{"id":103,"name":"collar","level":182,"min_range":1,"max_range":6,"launch_type":1,"effects":[{"id":22,"value1":60,"value2":10,"turns":2,"targets":22,"type":3}],"cost":5,"area":1,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":67},"74":{"id":74,"name":"fire_bulb","level":190,"min_range":2,"max_range":3,"launch_type":1,"effects":[{"id":14,"value1":2,"value2":0,"turns":0,"targets":31,"type":8}],"cost":14,"area":1,"cooldown":6,"los":1,"team_cooldown":1,"initial_cooldown":0,"template":41},"27":{"id":27,"name":"warm_up","level":197,"min_range":1,"max_range":6,"launch_type":1,"effects":[{"id":4,"value1":35,"value2":5,"turns":3,"targets":30,"type":3}],"cost":5,"area":1,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":28},"59":{"id":59,"name":"teleportation","level":200,"min_range":1,"max_range":12,"launch_type":1,"effects":[{"id":10,"value1":0,"value2":0,"turns":0,"targets":31,"type":5}],"cost":7,"area":1,"cooldown":10,"los":0,"team_cooldown":0,"initial_cooldown":1,"template":37},"12":{"id":12,"name":"winged_boots","level":203,"min_range":2,"max_range":8,"launch_type":1,"effects":[{"id":7,"value1":0.5,"value2":0.1,"turns":3,"targets":30,"type":3}],"cost":4,"area":3,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":31},"90":{"id":90,"name":"fertilizer","level":205,"min_range":1,"max_range":5,"launch_type":1,"effects":[{"id":12,"value1":80,"value2":10,"turns":0,"targets":22,"type":2}],"cost":6,"area":1,"cooldown":3,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":53},"25":{"id":25,"name":"steroid","level":207,"min_range":1,"max_range":6,"launch_type":1,"effects":[{"id":3,"value1":35,"value2":5,"turns":3,"targets":30,"type":3},{"id":25,"value1":35,"value2":5,"turns":1,"targets":30,"type":0}],"cost":5,"area":1,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":25},"105":{"id":105,"name":"burning","level":210,"min_range":4,"max_range":6,"launch_type":1,"effects":[{"id":1,"value1":78,"value2":9,"turns":0,"targets":21,"type":1},{"id":16,"value1":0,"value2":0,"turns":0,"targets":22,"type":1}],"cost":5,"area":5,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":69},"16":{"id":16,"name":"adrenaline","level":226,"min_range":2,"max_range":8,"launch_type":1,"effects":[{"id":8,"value1":0.5,"value2":0.1,"turns":3,"targets":30,"type":3},{"id":26,"value1":8,"value2":0,"turns":3,"targets":30,"type":0}],"cost":4,"area":3,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":34},"79":{"id":79,"name":"metallic_bulb","level":231,"min_range":1,"max_range":1,"launch_type":1,"effects":[{"id":14,"value1":7,"value2":0,"turns":0,"targets":31,"type":8}],"cost":16,"area":1,"cooldown":7,"los":1,"team_cooldown":1,"initial_cooldown":0,"template":46},"104":{"id":104,"name":"bark","level":234,"min_range":1,"max_range":6,"launch_type":1,"effects":[{"id":21,"value1":60,"value2":10,"turns":2,"targets":22,"type":3}],"cost":5,"area":1,"cooldown":1,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":68},"101":{"id":101,"name":"mirror","level":256,"min_range":0,"max_range":2,"launch_type":1,"effects":[{"id":20,"value1":5,"value2":1,"turns":3,"targets":30,"type":6}],"cost":5,"area":4,"cooldown":2,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":65},"78":{"id":78,"name":"lightning_bulb","level":289,"min_range":1,"max_range":5,"launch_type":1,"effects":[{"id":14,"value1":6,"value2":0,"turns":0,"targets":31,"type":8}],"cost":16,"area":1,"cooldown":6,"los":1,"team_cooldown":1,"initial_cooldown":0,"template":45},"99":{"id":99,"name":"plague","level":297,"min_range":1,"max_range":5,"launch_type":1,"effects":[{"id":13,"value1":40,"value2":10,"turns":4,"targets":31,"type":7}],"cost":6,"area":5,"cooldown":4,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":63},"84":{"id":84,"name":"resurrection","level":301,"min_range":1,"max_range":20,"launch_type":1,"effects":[{"id":15,"value1":0,"value2":0,"turns":0,"targets":31,"type":2}],"cost":15,"area":1,"cooldown":10,"los":1,"team_cooldown":0,"initial_cooldown":0,"template":49}};


let chipsName = {
    "acceleration": "Accélération",
    "adrenaline": "Adrénaline",
    "antidote": "Antidote",
    "armor": "Armure",
    "armoring": "Blindage",
    "ball_and_chain": "Boulet",
    "bandage": "Bandage",
    "bark": "Écorce",
    "burning": "Brûlis",
    "carapace": "Carapace",
    "carapace_desc": "La carapace permet d'appliquer une armure très résistante sur vos invocations.",
    "collar": "Collier",
    "cure": "Guérison",
    "devil_strike": "Frappe du démon",
    "doping": "Dopage",
    "drip": "Perfusion",
    "ferocity": "Férocité",
    "fertilizer": "Fertilisant",
    "fire_bulb": "Bulbe Enflammé",
    "flame": "Flamme",
    "flash": "Éclair",
    "fortress": "Forteresse",
    "fracture": "Fracture",
    "healer_bulb": "Bulbe Guérisseur",
    "helmet": "Casque",
    "ice": "Glaçon",
    "iceberg": "Iceberg",
    "iced_bulb": "Bulbe Glacé",
    "inversion": "Inversion",
    "leather_boots": "Bottes de cuir",
    "liberation": "Libération",
    "lightning": "Foudre",
    "lightning_bulb": "Bulbe Foudroyant",
    "loam": "Terreau",
    "metallic_bulb": "Bulbe Métallique",
    "meteorite": "Météorite",
    "mirror": "Miroir",
    "motivation": "Motivation",
    "pebble": "Caillou",
    "plague": "Peste",
    "protein": "Protéines",
    "puny_bulb": "Bulbe Chétif",
    "rage": "Rage",
    "rampart": "Rempart",
    "reflexes": "Réflexes",
    "regeneration": "Régénération",
    "remission": "Rémission",
    "remission_desc": "La rémission permet de guérir très efficacement vos invocations.",
    "resurrection": "Résurrection",
    "rock": "Rocher",
    "rockfall": "Éboulement",
    "rocky_bulb": "Bulbe Rocheux",
    "seven_league_boots": "Bottes de 7 lieues",
    "shield": "Bouclier",
    "shock": "Décharge",
    "slow_down": "Ralentissement",
    "solidification": "Solidification",
    "soporific": "Somnifère",
    "spark": "Étincelle",
    "stalactite": "Stalactite",
    "steroid": "Stéroides",
    "stretching": "Étirement",
    "teleportation": "Téléportation",
    "thorn": "Épine",
    "toxin": "Toxine",
    "tranquilizer": "Tranquillisant",
    "vaccine": "Vaccin",
    "venom": "Venin",
    "wall": "Mur",
    "warm_up": "Échauffement",
    "whip": "Fouet",
    "winged_boots": "Bottes ailées"
};

for (let c in chips)
    chips[c].nameFr = chipsName[chips[c].name];

var typeEffect = {
    1: "Dégâts",
    2: "Soins",
    3: "Boost",
    4: "Protection",
    5: "Tactique",
    6: "Renvoi",
    7: "Poison",
    8: "Bulbe",
    9: "Entrave"
}

var effectId = {
    17: "EFFECT_SHACKLE_MP",
    18: "EFFECT_SHACKLE_TP",
    19: "EFFECT_SHACKLE_STRENGTH",
    24: "EFFECT_SHACKLE_MAGIC"
}

var effectStr = {
	1: "Dégâts de ",
	2: "Soigne de ",
	3: "Booste la force de ",
	4: "Booste l'agilité de ",
	5: "Protège de ", //bouclier relatif
	6: "Protège de ", //bouclier absolu
	7: "Booste les PM de ",
	8: "Booste les PT de ",
	9: "Diminue tous les envoûtements de 50%",
	10: "Téléporte le poireau",
	11: "Échange deux joueurs de place",
	12: "Augmente la vie maximum de ",
	13: "Empoisonne de ",
	14: "Invoque un ",
	15: "Fait revivre une entité",
	16: "Tue les cibles",
	17: "Retire ",
	18: "Retire ",
	19: "Retire ",
	20: "Renvoie",
	21: "Augmente la résistance de ",
	22: "Augmente la sagesse de ",
	23: "Retire tous les poisons",
	24: "Retire ",
	25: "Inflige des séquelles de ",
	26: "Applique une vulnérabilité de "
}

var bulbes = {
	1: "Bulbe chétif",
	2: "Bulbe enflammé",
	3: "Bulbe guérisseur",
	4: "Bulbe rocheux",
	5: "Bulbe glacé",
	6: "Bulbe foudroyant",
	7: "Bulbe métallique"
}


