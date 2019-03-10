/* todo 
 *
 * ajouter les cibles
 * indiquer les caracs des buffs
 * récupérer les data via l'api
 * caracs lors de la création d'un bulbe
 * enfoncer le bouton lors d'un clic
 *
 */

/*----------------------------------- Variables principales -----------------------------------*/


var level = 1;
var capital = 0;
var maxCapital = 0;
var weaponsSort = "level";
var chipsSort = "level";


/*----------------------------------- Fonctions pur HTML/CSS -----------------------------------*/

function td(str) {return "<td>" + str + "</td>\n";}
function th(str) {return "<th>" + str + "</th>\n";}



/*
 * Flash un élément.
 */
function flash(elt)
{
    if (elt.style.animation == "")
        elt.style.animation = "flash 0.5s linear";

    setTimeout(function () { elt.style.animation = ""; }, 1000);
}



/*
 * Échange deux éléments.
 */
function swapElements(el1, el2) {
    let prev1 = el1.previousSibling;
    let prev2 = el2.previousSibling;

    prev1.after(el2);
    prev2.after(el1);
}



/*------------------------------------ Fonctions principales ------------------------------------*/



/*
 * Initialise les scripts js de la page.
 */
function init()
{
    // initialisation de la table des caractéristiques.
    let table = document.getElementById("characteristics").getElementsByTagName("table")[0];

    for (let c in characs)
    {
        let name = characs[c].name;
        name = name.charAt(0).toUpperCase() + name.substr(1);

        table.insertAdjacentHTML("beforeend",`
        <tr>
            <td><img src="https://leekwars.com/image/charac/` + c + `.png"></td>
            <td class="tdValue"><span   id="` + c + `Value">` + getMinCharac(c) + `</span></td>
            <td><button class="less100" id="` + c + `Less100" onclick='updateCharac("` + c + `", -100)' /></td>
            <td><button class="less10" id="` + c + `Less10"  onclick='updateCharac("` + c + `", -10)' /></button></td>
            <td><button class="less1" id="` + c + `Less1"   onclick='updateCharac("` + c + `", -1)' /></button></td>
            <td><button class="more1" id="` + c + `More1"   onclick='updateCharac("` + c + `", 1)' /></button></td>
            <td><button class="more10" id="` + c + `More10"  onclick='updateCharac("` + c + `", 10)' /></button></td>
            <td><button class="more100" id="` + c + `More100" onclick='updateCharac("` + c + `", 100)' /></button></td>
            <td class="tdCapital">(<span title="Capital investi en ` + characs[c].name + `" id="` + c + `Capital">0</span>)</td>
        </tr>`);
    }

    // initialisation des zones d'équipement des armes.
    let zoneFromW = document.getElementById("weaponsAvaible");

    for (let w in weapons)
    {
        // petit trick pour le drag-and-drop :
        // le div et l'image possèdent le même id et la même fonction ondragstart
        // comme ça, lorsque l'image ou la div sont bougés, dans les deux cas, le même id est indiqué
        // Et lorsqu'on drop, on ne cherche que la première occurence de l'id, et donc on bouge le div.
        let img = `<img id="` + weapons[w].name + `Img" src="` + getWeaponPng(w) + `" alt="` + weapons[w].nameFr + `" title="` + weapons[w].nameFr + `" ondragstart="dragItem(event,'weapon')">`;
        let div = `<div class="weaponImg" id="` + weapons[w].name + `Img" onclick="addWeapon(` + weapons[w].id +`)" ondragstart="dragItem(event,'weapon')" ondblclick="moveItem(event,'weapon')">` + img + `</div>`;
        zoneFromW.insertAdjacentHTML("beforeend", div);
    }

    sortWeaponsZone("weaponsAvaible",weaponsSort);

    let zoneFromC = document.getElementById("chipsAvaible");

    for (let c in chips)
    {
        // petit trick pour le drag-and-drop :
        // le div et l'image possèdent le même id et la même fonction ondragstart
        // comme ça, lorsque l'image ou la div sont bougés, dans les deux cas, le même id est indiqué
        // Et lorsqu'on drop, on ne cherche que la première occurence de l'id, et donc on bouge le div.
        let img = `<img id="` + chips[c].name + `Img" src="` + getChipPng(c) + `" alt="` + chips[c].nameFr + `" title="` + chips[c].nameFr + `" ondragstart="dragItem(event,'weapon')">`;
        let div = `<div class="chipImg" id="` + chips[c].name + `Img" onclick="addChip(` + chips[c].id +`)" ondragstart="dragItem(event,'weapon')" ondblclick="moveItem(event,'chip')">` + img + `</div>`;
        zoneFromC.insertAdjacentHTML("beforeend", div);
    }
    sortChipsZone("chipsAvaible",chipsSort);

    updateLevel();

    setArea(3, 0, true);
}



/*
 * Met à jour le niveau, si le slider ou le 'number' a été modifié.
 */
function updateLevel(lvl=-1)
{
    let levelSlider = document.getElementById("levelSlider");
    let levelNumber = document.getElementById("levelNumber");
    
    // on récupère le lvl demandé
    if (lvl != -1)
    {
        level = lvl;
    }
    else 
    {
        if (levelNumber.value == level)
        {
            level = levelSlider.value;
        }
        else {
            level = levelNumber.value;
        }
    }

    // on s'assure qu'il est bien entre 1 et 301
    level = Math.min(Math.max(1,level),301);

    // on vérifie que l'investissement en capital est tjrs valide
    if (maxCapital-capital > getMaxCapital()) {
        lvl = level;
        let c = maxCapital-capital;

        while (c > getMaxCapital(lvl) && lvl > 0)
            lvl++;

        level = lvl;
        flash(document.getElementById("configLeek"));
    }


    let weaponsEquipped = getItemsInZone("weaponsEquipped");
    
    // on vérifie que le nombre d'armes équippées est tjrs bon
    if (weaponsEquipped.length > getItemLimit(level,'weapon'))
    {
        level = (weaponsEquipped.length == 3)? 100 : 200;
        if (!isEquipmentHidden())
            flash(document.getElementById("weaponsEquipped"));
        else
            flash(document.getElementById("hideEquipment"))
    }

    // on vérifie que les armes équipées on le bon niveau
    for (let w in weaponsEquipped)
        weaponsEquipped[w][0] = getWeaponId(weaponsEquipped[w][0]);

    weaponsEquipped.sort(
        function (w1,w2)
        {
            return weapons[w2[0]].level - weapons[w1[0]].level
        }
    );

    for (let w in weaponsEquipped)
    {
        if (weapons[weaponsEquipped[w][0]].level > level)
        {
            level = weapons[weaponsEquipped[w][0]].level;
            
            if (!isEquipmentHidden())
                flash(weaponsEquipped[w][1]);
            else
                flash(document.getElementById("hideEquipment"))
            
            break;
        }
    }

    // idem, avec les puces
    let chipsEquipped = getItemsInZone("chipsEquipped");
    
    // on vérifie que le nombre d'armes équippées est tjrs bon
    if (chipsEquipped.length > getItemLimit(level,'chip'))
    {
        let stage = {8:50, 9:75, 10:100 , 11:125 , 12:150 , 13:200 , 14:250 , 15:300};
        level = stage[chipsEquipped.length];

        if (!isEquipmentHidden())
            flash(document.getElementById("chipsEquipped"));
        else
            flash(document.getElementById("hideEquipment"))
    }

    for (let c in chipsEquipped)
        chipsEquipped[c][0] = getChipId(chipsEquipped[c][0]);

    chipsEquipped.sort(
        function (c1,c2)
        {
            return chips[c2[0]].level - chips[c1[0]].level
        }
    );

    for (let c in chipsEquipped)
    {
        if (chips[chipsEquipped[c][0]].level > level)
        {
            level = chips[chipsEquipped[c][0]].level;

            if (!isEquipmentHidden())
                flash(chipsEquipped[c][1]);
            else
                flash(document.getElementById("hideEquipment"))
            
            break;
        }
    }

    // Ajout de la vie de base
    characs["life"]["min"] = getMinCharac("life");
    document.getElementById("lifeValue").textContent = getCharac("life");

    document.getElementById("maxWeaponsNumber").textContent = getItemLimit(level,'weapon');
    document.getElementById("maxChipsNumber").textContent   = getItemLimit(level,'chip');
    
    updateLeekAppearence();
    updateCapital();
    updateCharacsButtons();
    updateWeaponsAvaible();
    updateChipsAvaible();

    // update le slider et le "number"
    levelSlider.value = level;
    levelNumber.value = level;
}



/*-------------------------- Éditions des caractéristiques du poireau --------------------------*/



/*
 * Actualise la valeur du capital disponible et maximal.
 */
function updateCapital()
{
    capital -= maxCapital;
    maxCapital = getMaxCapital();
    capital += maxCapital;

    document.getElementById("capitalValue").textContent = capital;
    document.getElementById("capitalMaxValue").textContent = maxCapital;
}



/*
 * Indique quels boutons sont cliquables.
 */
function updateCharacsButtons()
{
    for(let c in characs)
    {
        let Nvalue = [-100,-10,-1,+1,+10,+100];
        for (let n in Nvalue) {
            n = Nvalue[n];

            let characCost = getCharacCost(c,n);            

            let enabled = ((getCharac(c) + characCost["variation"] >= getMinCharac(c)) && (characCost["capital"] <= capital) && (capital - characCost["capital"] >= 0));
            let tag = c + ((n>0)? "More":"Less") + Math.abs(n);
            
            document.getElementById(tag).disabled = !enabled;
            
            if (enabled)
            {
                document.getElementById(tag).title = characCost["capital"] + " capital pour " + characCost["variation"] + " " + characs[c]["name"];
            }
            else
            {
                document.getElementById(tag).title = "";
            }
        }
    }

    updateWeapons();
    updateChips();
}



/*
 * Actualise la caractéristique, lors d'un clic sur un bouton.
 *
 * n peut valoir -100,-10,-1,1,10 ou 100.
 */
function updateCharac(c,n)
{
    let characCost = getCharacCost(c,n);
    
    if ((getCharac(c) + characCost["variation"] >= getMinCharac(c)) && (characCost["capital"] <= capital) && (capital - characCost["capital"] >= 0))
    {
        characs[c]["value"] += characCost["variation"];
        characs[c]["capital"] += characCost["capital"];
        capital -= characCost["capital"];

        document.getElementById(c + "Value").textContent = getCharac(c);
        document.getElementById(c + "Capital").textContent = characs[c]["capital"];
    }

    updateCharacsButtons();
    updateCapital();
}



/*---------------------------------- Édition de l'équipement ----------------------------------*/



/*
 * Update l'affichage des armes disponibles.
 */
function updateWeaponsAvaible()
{
    for (let w in weapons)
    {
        let weapon = document.getElementById(weapons[w].name + "Img");
        let img = weapon.getElementsByTagName("img")[0];

        if (level < weapons[w].level)
        {
            weapon.style.opacity = 0.2;
            weapon.draggable = false;
            img.draggable = false;
        }
        else
        {
            weapon.style.opacity = 1;
            weapon.draggable = true;
            img.draggable = true;
        }
    }
}



/*
 * Update l'affichage des puces disponibles.
 */
function updateChipsAvaible()
{
    for (let c in chips)
    {
        let chip = document.getElementById(chips[c].name + "Img");
        let img = chip.getElementsByTagName("img")[0];

        if (level < chips[c].level)
        {
            chip.style.opacity = 0.2;
            chip.draggable = false;
            img.draggable = false;
        }
        else
        {
            chip.style.opacity = 1;
            chip.draggable = true;
            img.draggable = true;
        }
    }
}


/*-------- dragndrop --------*/


/*
 * Permet d'initialiser un drag-and-drop.
 */
function dragItem(e)
{
    if (e.target.draggable != true)
        return;

    // e.target.id : id de l'élément selectionné.
    e.dataTransfer.setData("text", e.target.id);
}



/*
 * Autorise le drop d'une arme dans une des deux zones définies.
 */
function allowItemDrop(e,type) {
    var elt = getZoneDrop(e.target,type);

    if (!itemDroppable(elt,type))
        return;
    
    e.target = elt;
    e.preventDefault();
}



/*
 * Drop de weapon !
 */
function dropItem(e,type)
{
    var zone = getZoneDrop(e.target,type);

    if (!itemDroppable(zone,type))
        return;

    // autorise le drop
    e.target = zone;
    e.preventDefault();

    // récupère le tag de l'élément droppé
    let tag = e.dataTransfer.getData("text");
    let item = document.getElementById(tag);
    let from = getZoneDrop(item,type);

    if (zone != from)
        moveItem({"target":item},type);
}


/*-------- double-clic --------*/


/*
 * Bouge l'item dans l'autre zone.
 */
function moveItem(event,type)
{
    let item = document.getElementById(event.target.id);
    let itemName = /([\w_]+)Img/.exec(item.id)[1];

    let parent = getZoneDrop(item,type);
    let destination = document.getElementById(type+((parent.id.endsWith("Avaible"))? "sEquipped":"sAvaible"));

    if (!(itemDroppable(destination,type) && ((type == 'chip' && chips[getChipId(itemName)].level <= level) || (type == 'weapon' && weapons[getWeaponId(itemName)].level <= level))))
        return;

    destination.appendChild(item);
    document.getElementById(type+"sNumber").textContent = getItemsInZone(type+"sEquipped").length;

    if (type == "weapon")
    {
        sortWeaponsZone(destination.id,weaponsSort);
        let id = getWeaponId(itemName);

        if (destination.id.endsWith("Equipped"))
        {
            addWeapon(id);
        }
        else
        {
            removeChip(id,'weapon');
        }
    }
    else
    {
        sortChipsZone(destination.id,chipsSort);
        let id = getChipId(itemName);

        if (destination.id.endsWith("Equipped"))
        {
            addChip(id);
        }
        else
        {
            removeChip(id,'chip');
        }
    }
    
    document.getElementById(type+"sNumber").textContent = getItemsInZone(type+"sEquipped").length;
}


/*-------- Tri des zones d'armes/puces --------*/


/*
 * Trie la zone en fonction du type.
 *
 * type peut être "level","range"...
 */
function sortChipsZone(zoneTag,type)
{
    let items = getItemsInZone(zoneTag);
    let zone = document.getElementById(zoneTag);

    for (let i in items)
        items[i][0] = getChipId(items[i][0])

    if (type == "level")
    {
        items = items.sort(
            function (item1,item2)
            {
                return chips[item1[0]].level - chips[item2[0]].level;
            }
        );
    }
    else if (type == "range")
    {
        items = items.sort(
            function (item1,item2)
            {
                let r1 = chips[item1[0]].max_range;
                let r2 = chips[item2[0]].max_range;
                
                if (r1 - r2 == 0)
                    return chips[item1[0]].level - chips[item2[0]].level;

                return r1 - r2;
            }
        );
    }
    else if (type == 'type')
    {
        items = items.sort(
            function (item1,item2)
            {
                let r1 = chips[item1[0]].effects[0].id;
                let r2 = chips[item2[0]].effects[0].id;
                
                if (r1 - r2 == 0)
                    return chips[item1[0]].level - chips[item2[0]].level;

                return r1 - r2;
            }
        );
    }

    zone.innerHTML = "";

    for (let i in items)
    {
        zone.appendChild(items[i][1]);
    }
}

/*
 * Trie les armes selon le type de tri.
 */
function sortItem(way, type)
{
    if (type == 'weapon') 
    {
        sortWeaponsZone('weaponsAvaible',way);
        sortWeaponsZone('weaponsEquipped',way);
    }
    else
    {
        sortChipsZone('chipsAvaible',way);
        sortChipsZone('chipsEquipped',way);
    }
}


/*-------- Fonctions annexes pr l'équipement --------*/


/*
 * Renvoie les armes/puces contenues dans la zone indiquée.
 */
function getItemsInZone (zoneTag)
{
    let img = document.getElementById(zoneTag).children;
    let items = [];
    let patt = /([\w_]+)Img/;

    for (let i in img)
    {
        let tag = img[i].id;
        let re = patt.exec(tag);
        
        if (re != null)
            items.push([re[1],img[i]]);
    }

    return items;
}



/*
 * Renvoie la zone ou dropper l'élément.
 */
function getZoneDrop(elt,type)
{
    if (elt.nodeName == "IMG")
    {
        elt = elt.parentNode.parentNode;
    }
    else if (elt.nodeName == "DIV" && (elt.id != (type+"sAvaible") && elt.id != (type+"sEquipped")))
    {
        elt = elt.parentNode;
    }

    return elt;
}



/*
 * Renvoie si la zone est droppable pour une arme.
 */
function itemDroppable (elt,type)
{
    return (elt.id == (type+"sAvaible") || (elt.id == (type+"sEquipped") && getItemLimit(level,type) > getItemsInZone(elt.id).length));
}



/*
 * Trie la zone en fonction du type.
 *
 * type peut être "level","range"...
 */
function sortWeaponsZone(zoneTag,type)
{
    let items = getItemsInZone(zoneTag);
    let zone = document.getElementById(zoneTag);

    for (let i in items)
        items[i][0] = getWeaponId(items[i][0])

    if (type == "level")
    {
        items = items.sort(
            function (item1,item2)
            {
                return weapons[item1[0]].level - weapons[item2[0]].level;
            }
        );
    }
    else if (type == "range")
    {
        items = items.sort(
            function (item1,item2)
            {
                let r1 = weapons[item1[0]].max_range;
                let r2 = weapons[item2[0]].max_range;
                
                if (r1 - r2 == 0)
                    return weapons[item1[0]].level - weapons[item2[0]].level;

                return r1 - r2;
            }
        );
    }

    zone.innerHTML = "";

    for (let i in items)
    {
        zone.appendChild(items[i][1]);
    }
}


/*------------------------------ Caractéristiques de l'équipement ------------------------------*/


/*
 * Ajoute une arme au tableau.
 */
function addWeapon(id)
{
    let table = document.getElementById("weaponsInfo");
    table.innerHTML = "";
    let weaponDiv = document.getElementById(weapons[id].name + "Img");
    weaponDiv.actif = "true";
    
    let row = table.insertRow(-1);
    row.id = id;

    row.insertCell(-1).innerHTML = "<div class=\"weaponImg\"><img src=\"" + getWeaponPng(id) + "\" alt=\"" + weapons[id].nameFr + "\"></div>";
    row.insertCell(-1).textContent = weapons[id].nameFr;
    row.insertCell(-1).innerHTML = "<img class='littleTP' src='https://leekwars.com/image/charac/tp.png' /> " + weapons[id].cost;
    row.insertCell(-1).textContent = getTypeOfArea(weapons[id]);
    row.insertCell(-1).textContent = getTypeOfZone(weapons[id].area);
    row.insertCell(-1).textContent = (weapons[id].los)? "oui":"non";
    row.insertCell(-1).textContent = getConstItem(id,'weapon');
    
    // effects
    let effects = row.insertCell(-1);
    effects.innerHTML = updateEffects(weapons[id].effects)
}



/*
 * Ajoute une puce au tableau.
 */
function addChip(id)
{
    let table = document.getElementById("chipsInfo");
    table.innerHTML = "";
    
    let row = table.insertRow(-1);
    row.id = id;

    row.insertCell(-1).innerHTML = "<img src=\"" + getChipPng(id) + "\" alt=\"" + chips[id].nameFr + "\">";
    row.insertCell(-1).textContent = chips[id].nameFr;
    row.insertCell(-1).innerHTML = "<img class='littleTP' src='https://leekwars.com/image/charac/tp.png' /> " + chips[id].cost;
    row.insertCell(-1).textContent = getTypeOfArea(chips[id]);
    row.insertCell(-1).textContent = getTypeOfZone(chips[id].area);
    row.insertCell(-1).textContent = (chips[id].los)? "oui":"non";
    row.insertCell(-1).textContent = getConstItem(id,'chip');
    
    // effects
    let effects = row.insertCell(-1);
    effects.innerHTML = updateEffects(chips[id].effects)
}



/*
 * Retire un item du tableau.
 */
function removeItem(id,type)
{
    let table = document.getElementById(type+"sInfo");
    let rows = table.getElementsByTagName("tr");

    let i = 0;

    for (; i < rows.length; i++)
    {
        if (rows[i].id == id)
            break
    }
    
    table.deleteRow(i);
}



/*
 * Update les effets, en fonction des caractéristiques.
 *
 * (renvoie le code html des effets mis à jours)
 */
function updateEffects(effects)
{
    let effectsList = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]};
    let characLinked = {1:"strength",2:"wisdom",3:"science",4:"resistance",6:"agility",7:"magic",9:"magic"}

    for (let e in effects)
    {
        let type = effects[e].type;

        if (type != 0 && type != 5 && type != 8)
        {
            let coef = getCharacCoef(characLinked[type])
            let txt = Math.round(effects[e].value1 * coef);

            if (effects[e].value2 != 0)
                txt += ' - ' + Math.round((effects[e].value1 + effects[e].value2) * coef);

            if (type != 9)
                effectsList[type].push([txt,effects[e].turns]);
            else
                effectsList[type].push([txt,effects[e].turns,effects[e].id]);

        }
    }


    let html = "";

    for (let e in effectsList)
    {
        if (effectsList[e].length == 0)
            continue;
        
        let effect = "<span class=\"effect\">" + typeEffect[e] + " : ";
        let sameDuration = true;


        for (let v in effectsList[e])
        {
            if (effectsList[e][v][1] != effectsList[e][0][1])
            {
                sameDuration = false;
                break;
            }
        }

        for (let v in effectsList[e])
        {
            effect += effectsList[e][v][0];

            console.log("I'm here with v :",v)
            // debuff
            if (e == 9)
            {
                console.log("hey there")
                effect += ' ' + {17: "mp", 18: "tp", 19: "force", 24: "magie"}[effectsList[e][v][2]];
            }

            if (!sameDuration && effectsList[e][v][1] > 0)
                effect += " (" + effectsList[e][v][1] + " tours)";
        }

        if (sameDuration && effectsList[e][0][1] > 0)
            effect += " (" + effectsList[e][0][1] + " tours)";

        effect += "</span>";
        
        html += effect;
    }

    return html;
}



/*
 * Mets à jour les données des armes.
 */
function updateWeapons()
{
    let table = document.getElementById("weaponsInfo");
    let rows = table.getElementsByTagName("tr");
    rows = Array.prototype.slice.call(rows, 0);

    for (let r in rows)
    {
        // dernière cellule :
        let i = rows[r].cells.length - 1
        rows[r].cells[i].innerHTML = updateEffects(weapons[rows[r].id].effects)
    }
}


/*
 * Mets à jour les données des armes.
 */
function updateChips()
{
    let table = document.getElementById("chipsInfo");
    let rows = table.getElementsByTagName("tr");
    rows = Array.prototype.slice.call(rows, 0);

    for (let r in rows)
    {
        // on passe la première ligne
        if (r == 0)
        {
            continue;
        }

        // dernière cellule :
        let i = rows[r].cells.length - 1
        rows[r].cells[i].innerHTML = updateEffects(chips[rows[r].id].effects)
    }
}


/*------------------------------------- Fonctions annexes -------------------------------------*/


/*
 * Pour un caractère et une variation pour ce caractère, renvoie le nombre de capital à dépenser,
 * ainsi que le montant dont va réellement changer le caractère.
 * 
 * On gère aussi le passage des paliers.
 */
function getCharacCost(c,n)
{
    let variation  = 0;
    let tmpCapital = 0;

    if (n > 0)
    {
        while (variation < n)
        {
            let step = 0;

            for (; step < costs[c].length; ++step)
            {
                if (characs[c].value+variation < costs[c][step].step)
                    break;
            }

            step--;

            variation  += costs[c][step].sup;
            tmpCapital += costs[c][step].capital;
        }
    }
    else
    {
        while (variation > n)
        {
            let step = 0;

            for (; step < costs[c].length; ++step)
            {
                if (characs[c].value+variation-costs[c][step].sup < costs[c][step].step)
                    break;
            }

            if (step > 0) step--;

            variation  -= costs[c][step]["sup"];
            tmpCapital -= costs[c][step]["capital"];

        }
    }

    return {"capital":tmpCapital, "variation":variation};
}



/*
 * Renvoie la valeur minimale d'une caractéristique.
 */
function getMinCharac(c)
{
    if (c == "life")
    {
        return 97 + 3*level;
    }

    return characs[c].min;
}



/*
 * Renvoie la valeur du caractère.
 */
function getCharac(c) 
{
    return getMinCharac(c) + characs[c].value;
}



/*
 * Renvoie le capital maximum au niveau du poireau
 */
function getMaxCapital(lvl=level)
{
    return 5*lvl + 45*(1 + parseInt(lvl/100)) + (lvl == 301 ? 95 : 0);
}



/*
 * Remet les caractéristiques à 0.
 */
function resetCharacs()
{
    for (let c in characs)
    {
        characs[c]["value"] = 0;
        characs[c]["capital"] = 0;
        updateCharac(c,0);
        capital = getMaxCapital();
    }
    updateCharacsButtons();
    updateLevel(level);
}



/*
 * Actualise l'image du poireau, en fonction de son niveau;
 */
function updateLeekAppearence()
{
    let lvl = 0;
    let stage = [0,10,20,50,80,100,150,200,250,300,301];

    while (level >= stage[lvl] && lvl < stage.length)
    {
        lvl++;
    }

    let url = "https://leekwars.com/image/leek/leek" + lvl + "_front_"+color+".png";

    document.getElementById("leekImage").getElementsByTagName("img")[0].src = url;
}
var ula = updateLeekAppearence;



/*
 * Renvoie l'url associée à l'image de l'arme.
 */
function getWeaponPng(w)
{
    return "https://leekwars.com/image/weapon/"+ weapons[w].name + ".png";
}



/*
 * Renvoie l'url associée à l'image de l'arme.
 */
function getChipPng(c)
{
    return "https://leekwars.com/image/chip/small/"+ chips[c].name + ".png";
}



/*
 * Renvoie l'id d'une arme.
 */
function getWeaponId(name)
{
    for (let w in weapons)
    {
        if (weapons[w].name == name)
            return w
    }
}



/*
 * Renvoie l'id d'une puce.
 */
function getChipId(name)
{
    for (let c in chips)
    {
        if (chips[c].name == name)
            return c
    }
}



/*
 * Renvoie le nombre d'armes maximum que peut porter un poireau.
 */
function getItemLimit(lvl,type)
{
    if (type == "weapon")
    {
        if (lvl < 100)
            return 2;

        if (lvl < 200)
            return 3;

        return 4;
    }
    else
    {
        let steps = [0,50,75,100,125,150,200,250,300]
        let step = 0;

        for (; step < steps.length; step++)
        {
            if (lvl < steps[step])
                break;
        }

        step--;

        return 7 + step;
    }
}



/*
 * Masque le choix de l'équipement.
 */
function hideEquipment()
{
    let equipment = document.getElementById("equipment");
    let button    = document.getElementById("hideEquipment");
    let buttonToHide = document.getElementById("hideEquipmentToHide");

    if (equipment.style.display == "")
    {
        equipment.style.display = "none";
        buttonToHide.style.display = "none";
        button.textContent = "Afficher l'équipement";
    }
    else
    {
        equipment.style.display = "";
        buttonToHide.style.display = "";
        button.textContent = "Masquer l'équipement";
    }
}



/*
 * Renvoie si l'equipement est caché ou non.
 */
function isEquipmentHidden()
{
    return document.getElementById("equipment").style.display == "none";
}



/*
 * Renvoie le nom de la constante associée à l'item.
 */
function getConstItem(id,type)
{
    return (type + '_' + ((type=='weapon')?weapons:chips)[id].name).toUpperCase()
}



/*
 * Calcule le coefficient à appliquer pour la caractéristique.
 */
function getCharacCoef(c)
{
    return (1 + getCharac(c) / 100);
}



/*
 * Renvoie la portée de l'item.
 */
function getTypeOfArea(item)
{
    let area = item.min_range;

    if (item.min_range != item.max_range)
    {
        area += " - " + item.max_range;
    }


    if (item.launch_type == 0)
    {
        area += ", en ligne uniquement";
    }

    return area;
}



/*
 * Renvoie le type de zone affectée.
 */
function getTypeOfZone(area)
{
    return ["","cellule", "ligne", "cercle 1", "cercle 2", "cercle 3"][area]
}


/*----------------------------------------------------------------------------------------------*/
function setArea(max, min, notLine){
	let test = document.getElementById("test");
	let cells = [];
	
	for (let i = 0; i < max*2+1; i++){
		cells.i = []
		
		for (let j = 0; j < max*2+1; j++) {
			let x = i - max;
			let y = j - max;
			
			if (Math.abs(x) + Math.abs(y) <= max && Math.abs(x) + Math.abs(y) >= min && (notLine || (x === 0 || y === 0))){let result = "full";}
			else {let result = "";}
			
			cells[i][j] = result;}
	}
	
	for (let x = 0; x < cells.lenght; x++){
		let line = test.insertRow(-1);
		for (let y = 0; y < cells[x].lenght; y++){
			line.insertCell(-1).innerHTML = "<th class=\"" + cells[x][y] + "\"></th>";}
	}
}