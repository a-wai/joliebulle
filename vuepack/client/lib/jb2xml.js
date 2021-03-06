/*jslint nomen: true */
/*global  DOMParser*/

function htmlEscape(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

var jb2xml = (function () {
    "use strict";
    var parser, string, xml;
    return {

        exportString : function (recipe) {
            parser = new DOMParser();
            string = "<RECIPES><RECIPE>";
            string += "<NAME>" + htmlEscape(recipe.name) + "</NAME>";
            string += "<VERSION>1</VERSION>";
            string += "<TYPE>" + htmlEscape(recipe.type) + "</TYPE>";
            string += "<BREWER>" + htmlEscape(recipe.brewer) + "</BREWER>";
            string += "<STYLE><NAME>" + htmlEscape(recipe.style) + "</NAME><VERSION>1</VERSION><CATEGORY /><CATEGORY_NUMBER /><STYLE_LETTER /><STYLE_GUIDE /><TYPE /><OG_MIN /><OG_MAX /><FG_MIN /><FG_MAX /><IBU_MIN /><IBU_MAX /><COLOR_MIN /><COLOR_MAX /></STYLE>";
            string += "<BATCH_SIZE>" + recipe.volume + "</BATCH_SIZE>";
            string += "<BOIL_SIZE />";
            string += "<BOIL_TIME>" + recipe.boilTime + "</BOIL_TIME>";
            string += "<EFFICIENCY>" + recipe.efficiency + "</EFFICIENCY>";
            string += "<OG>" + recipe.og + "</OG><FG>" + recipe.fg + "</FG>";
            string += "<FERMENTABLES>";
            recipe.fermentables.forEach(function (fermentable) {
                string += "<FERMENTABLE>";
                string += "<NAME>" + htmlEscape(fermentable.name) + "</NAME>";
                string += "<VERSION>1</VERSION>";
                string += "<AMOUNT>" + fermentable.amount / 1000 + "</AMOUNT>";
                string += "<TYPE>" + htmlEscape(fermentable.type) + "</TYPE>";
                string += "<YIELD>" + fermentable.fyield + "</YIELD>";
                string += "<RECOMMEND_MASH>" + fermentable.recoMash + "</RECOMMEND_MASH>";
                string += "<ADD_AFTER_BOIL>" + fermentable.afterBoil + "</ADD_AFTER_BOIL>";
                string += "<COLOR>" + fermentable.color / 1.97 + "</COLOR>";
                string += "</FERMENTABLE>";
            });
            string += "</FERMENTABLES>";
            string += "<HOPS>";
            recipe.hops.forEach(function (hop) {
                string += "<HOP>";
                string += "<NAME>" + htmlEscape(hop.name) + "</NAME>";
                string += "<VERSION>1</VERSION>";
                string += "<AMOUNT>" + hop.amount / 1000 + "</AMOUNT>";
                if (hop.form === 0 || hop.form === 'Pellet') {
                    string += "<FORM>Pellet</FORM>";
                } else if (hop.form === 1 || hop.form === 'Leaf') {
                    string += "<FORM>Leaf</FORM>";
                } else if (hop.form === 2 || hop.form === 'Plug') {
                    string += "<FORM>Plug</FORM>";
                }
                if (hop.use === 'Dry Hop') {
                    string += "<TIME>" + hop.time*24*60 + "</TIME>";
                    string += "<DISPLAY_TIME>" + hop.time + " days</DISPLAY_TIME>";
                } else {
                    string += "<TIME>" + hop.time + "</TIME>";
                }
                string += "<ALPHA>" + hop.alpha + "</ALPHA>";
                string += "<USE>" + hop.use + "</USE>";
                string += "</HOP>";

            });
            string += "</HOPS>";
            string += "<YEASTS>";
            recipe.yeasts.forEach(function (yeast) {
                string += "<YEAST>";
                string += "<NAME>" + htmlEscape(yeast.name) + "</NAME>";
                string += "<VERSION>1</VERSION>";
                string += "<TYPE />";
                string += "<FORM>" + htmlEscape(yeast.form) + "</FORM>";
                string += "<LABORATORY>" + htmlEscape(yeast.labo) + "</LABORATORY>";
                string += "<PRODUCT_ID>" + htmlEscape(yeast.product_id) + "</PRODUCT_ID>";
                string += "<ATTENUATION>" + yeast.attenuation + "</ATTENUATION>";
                string += "</YEAST>";
            });
            string += "</YEASTS>";
            string += "<MISCS>";
            recipe.miscs.forEach(function (misc) {
                string += "<MISC>";
                string += "<NAME>" + htmlEscape(misc.name) + "</NAME>";
                string += "<VERSION>1</VERSION>";
                string += "<AMOUNT>" + misc.amount / 1000 + "</AMOUNT>";
                string += "<TYPE>" + htmlEscape(misc.type) + "</TYPE>";
                string += "<TIME>" + misc.time + "</TIME>";
                string += "<USE>" + htmlEscape(misc.use) + "</USE>";
                string += "</MISC>";
            });
            string += "</MISCS>";
            string += "<WATERS/>";
            string += "<MASH>";
            string += "<NAME>" + htmlEscape(recipe.mashProfile.name) + "</NAME>";
            string += "<VERSION>1</VERSION>";
            string += "<GRAIN_TEMP>" + recipe.grainTemp + "</GRAIN_TEMP>";
            string += "<TUN_TEMP>" + recipe.mashProfile.tunTemp + "</TUN_TEMP>";
            string += "<SPARGE_TEMP>" + recipe.mashProfile.sparge + "</SPARGE_TEMP>";
            string += "<PH>" + recipe.mashProfile.ph + "</PH>";
            string += "<MASH_STEPS>";
            recipe.mashProfile.steps.forEach(function (step) {
                string += "<MASH_STEP>";
                string += "<NAME>" + htmlEscape(step.name) + "</NAME>";
                string += "<VERSION>1</VERSION>";
                string += "<TYPE>" + step.type + "</TYPE>";
                string += "<STEP_TIME>" + step.time + "</STEP_TIME>";
                string += "<STEP_TEMP>" + step.temp + "</STEP_TEMP>";
                string += "<INFUSE_AMOUNT>0</INFUSE_AMOUNT>";
                string += "</MASH_STEP>";
            });
            string += "</MASH_STEPS>";
            string += "</MASH>";
            string += "<NOTES>" + htmlEscape(recipe.notes) + "</NOTES>";
            string += "</RECIPE></RECIPES>";

            xml = parser.parseFromString(string, "application/xml");
            return string;

        }





    };
}());
