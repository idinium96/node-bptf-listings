const SteamID = require('steamid');
const Currencies = require('tf2-currencies-2');
const SKU = require('tf2-sku-2');

const killstreakKit = new Map();
killstreakKit
    .set('Rocket Launcher', 5726)
    .set('Scattergun', 5727)
    .set('Sniper Rifle', 5728)
    .set('Shotgun', 5729)
    .set('Ubersaw', 5730)
    .set('Gloves of Running Urgently', 5731)
    .set('Spy-cicle', 5732)
    .set('Axtinguisher', 5733)
    .set('Stickybomb Launcher', 5743)
    .set('Minigun', 5744)
    .set('Direct Hit', 5745)
    .set('Huntsman', 5746)
    .set('Backburner', 5747)
    .set('Back Scatter', 5748)
    .set('Kritzkrieg', 5749)
    .set('Ambassador', 5750)
    .set('Frontier Justice', 5751)
    .set('Flare Gun', 5793)
    .set('Wrench', 5794)
    .set('Revolver', 5795)
    .set('Machina', 5796)
    .set("Baby Face's Blaster", 5797)
    .set('Huo-Long Heater', 5798)
    .set('Loose Cannon', 5799)
    .set('Vaccinator', 5800)
    .set('Air Strike', 5801);

const pistolSkins = new Map();
pistolSkins
    .set(0, 15013)
    .set(18, 15018)
    .set(35, 15035)
    .set(41, 15041)
    .set(46, 15046)
    .set(56, 15056)
    .set(61, 15061)
    .set(63, 15060)
    .set(69, 15100)
    .set(70, 15101)
    .set(74, 15102)
    .set(78, 15126)
    .set(81, 15148);

const rocketLauncherSkins = new Map();
rocketLauncherSkins
    .set(1, 15014)
    .set(6, 15006)
    .set(28, 15028)
    .set(43, 15043)
    .set(52, 15052)
    .set(57, 15057)
    .set(60, 15081)
    .set(69, 15104)
    .set(70, 15105)
    .set(93, 15129)
    .set(79, 15130)
    .set(80, 15150);

const medicgunSkins = new Map();
medicgunSkins
    .set(2, 15010)
    .set(5, 15008)
    .set(25, 15025)
    .set(39, 15039)
    .set(50, 15050)
    .set(65, 15078)
    .set(72, 15097)
    .set(93, 15120)
    .set(78, 15121)
    .set(79, 15122)
    .set(81, 15145)
    .set(83, 15146);

const revolverSkins = new Map();
revolverSkins
    .set(3, 15011)
    .set(27, 15027)
    .set(42, 15042)
    .set(51, 15051)
    .set(63, 15064)
    .set(64, 15062)
    .set(65, 15063)
    .set(72, 15103)
    .set(93, 15127)
    .set(77, 15128)
    .set(81, 15149);

const stickybombSkins = new Map();
stickybombSkins
    .set(4, 15012)
    .set(8, 15009)
    .set(24, 15024)
    .set(38, 15038)
    .set(45, 15045)
    .set(48, 15048)
    .set(60, 15082)
    .set(62, 15083)
    .set(63, 15084)
    .set(68, 15113)
    .set(93, 15137)
    .set(78, 15138)
    .set(81, 15155);

const sniperRifleSkins = new Map();
sniperRifleSkins
    .set(7, 15007)
    .set(14, 15000)
    .set(19, 15019)
    .set(23, 15023)
    .set(33, 15033)
    .set(59, 15059)
    .set(62, 15070)
    .set(64, 15071)
    .set(65, 15072)
    .set(93, 15135)
    .set(66, 15111)
    .set(91, 15112)
    .set(78, 15136)
    .set(82, 15154);

const flameThrowerSkins = new Map();
flameThrowerSkins
    .set(9, 15005)
    .set(17, 15017)
    .set(30, 15030)
    .set(34, 15034)
    .set(49, 15049)
    .set(54, 15054)
    .set(60, 15066)
    .set(61, 15068)
    .set(62, 15067)
    .set(66, 15089)
    .set(91, 15090)
    .set(93, 15115)
    .set(80, 15141);

const minigunSkins = new Map();
minigunSkins
    .set(10, 15004)
    .set(20, 15020)
    .set(26, 15026)
    .set(31, 15031)
    .set(40, 15040)
    .set(55, 15055)
    .set(61, 15088)
    .set(62, 15087)
    .set(63, 15086)
    .set(70, 15098)
    .set(73, 15099)
    .set(93, 15123)
    .set(77, 15125)
    .set(78, 15124)
    .set(84, 15147);

const scattergunSkins = new Map();
scattergunSkins
    .set(11, 15002)
    .set(15, 15015)
    .set(21, 15021)
    .set(29, 15029)
    .set(36, 15036)
    .set(53, 15053)
    .set(61, 15069)
    .set(63, 15065)
    .set(69, 15106)
    .set(72, 15107)
    .set(74, 15108)
    .set(93, 15131)
    .set(83, 15157)
    .set(92, 15151);

const shotgunSkins = new Map();
shotgunSkins
    .set(12, 15003)
    .set(16, 15016)
    .set(44, 15044)
    .set(47, 15047)
    .set(60, 15085)
    .set(72, 15109)
    .set(93, 15132)
    .set(78, 15133)
    .set(86, 15152);

const smgSkins = new Map();
smgSkins
    .set(13, 15001)
    .set(22, 15022)
    .set(32, 15032)
    .set(37, 15037)
    .set(58, 15058)
    .set(65, 15076)
    .set(69, 15110)
    .set(79, 15134)
    .set(81, 15153);

const wrenchSkins = new Map();
wrenchSkins.set(60, 15074).set(61, 15073).set(64, 15075).set(75, 15114).set(77, 15140).set(78, 15139).set(82, 15156);

const grenadeLauncherSkins = new Map();
grenadeLauncherSkins
    .set(60, 15077)
    .set(63, 15079)
    .set(91, 15091)
    .set(68, 15092)
    .set(93, 15116)
    .set(77, 15117)
    .set(80, 15142)
    .set(84, 15158);

const knifeSkins = new Map();
knifeSkins
    .set(64, 15080)
    .set(69, 15094)
    .set(70, 15095)
    .set(71, 15096)
    .set(77, 15119)
    .set(78, 15118)
    .set(81, 15143)
    .set(82, 15144);

class Listing {
    /**
     * Creates a new instance of the listing class
     * @param {Object} listing A backpack.tf listing object
     * @param {String} listing.id
     * @param {Number} listing.intent
     * @param {Object} listing.item
     * @param {Number} listing.appid
     * @param {Object} listing.currencies
     * @param {Number} listing.offers
     * @param {Number} listing.buyout
     * @param {String} listing.details
     * @param {Number} listing.promoted
     * @param {Number} listing.created
     * @param {Number} listing.bump
     * @param {Object} manager Instance of bptf-listings
     */
    constructor(listing, manager) {
        this.id = listing.id;
        this.steamid = new SteamID(listing.steamid);
        this.intent = listing.intent;
        this.item = listing.item;
        this.appid = listing.appid;
        this.currencies = new Currencies(listing.currencies);
        this.offers = listing.offers === 1;
        this.buyout = listing.buyout === 1;
        this.promoted = listing.promoted;
        this.details = listing.details;
        this.created = listing.created;
        this.bump = listing.bump;

        this._manager = manager;
    }

    /**
     * Gets the sku of the item in the listing
     * @return {String}
     */
    getSKU() {
        if (this.appid !== 440) {
            return null;
        }

        return SKU.fromObject(this.getItem());
    }

    /**
     * Returns the item in the listings
     * @return {Object}
     */
    getItem() {
        if (this.appid !== 440) {
            return this.item;
        }

        const item = {
            defindex: this.item.defindex,
            quality: this.item.quality,
            craftable: this.item.flag_cannot_craft !== true
        };

        // Backpack.tf uses item_name for when making listings, meaning that the defindex in some cases is incorrect

        const schemaItem = this._manager.schema.getItemByDefindex(item.defindex);
        const schemaItems = this._manager.schema.raw.schema.items;
        const schemaItemByName = schemaItems.find(
            v => v.name === schemaItem.item_name && schemaItem.item_quality !== 0
        );

        if (schemaItemByName !== undefined) {
            item.defindex = schemaItemByName.defindex;
        }

        const attributes = this._parseAttributes();

        for (const attribute in attributes) {
            if (!attributes.hasOwnProperty(attribute)) {
                continue;
            }

            item[attribute] = attributes[attribute];
        }

        // Fix stock defindex
        if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(item.defindex)) {
            item.defindex += 190;
        } else if ([10, 11, 12].includes(item.defindex)) {
            item.defindex = 199;
        } else if ([13, 14, 15, 16, 17, 18, 19, 20, 21].includes(item.defindex)) {
            item.defindex += 187;
        } else if ([22, 23].includes(item.defindex)) {
            item.defindex = 209;
        } else if (item.defindex === 24) {
            item.defindex = 210;
        } else if (item.defindex === 25) {
            item.defindex = 737;
        } else if ([29, 30].includes(item.defindex)) {
            item.defindex += 182;
        } else if (item.defindex === 735) {
            item.defindex = 736;
        } else if (item.defindex === 1163) {
            item.defindex = 489;
        } else if (item.defindex === 831 && item.quality !== 1) {
            // Fix Exclusive Genuine Items (still needed for KS/etc)
            item.defindex = 810; // Red-Tape Recorder
        } else if (item.defindex === 810 && item.quality === 1) {
            item.defindex = 831; // Genuine Red-Tape Recorder
        } else if (item.defindex === 832 && item.quality !== 1) {
            item.defindex = 811; // Huo-Long Heater
        } else if (item.defindex === 811 && item.quality === 1) {
            item.defindex = 832; // Genuine Huo-Long Heater
        } else if (item.defindex === 833 && item.quality !== 1) {
            item.defindex = 812; // Flying Guillotine
        } else if (item.defindex === 812 && item.quality === 1) {
            item.defindex = 833; // Genuine Flying Guillotine
        } else if (item.defindex === 834 && item.quality !== 1) {
            item.defindex = 813; // Neon Annihilator
        } else if (item.defindex === 813 && item.quality === 1) {
            item.defindex = 834; // Genuine Neon Annihilator
        } else if (item.defindex === 835 && item.quality !== 1) {
            item.defindex = 814; // Triad Trinket
        } else if (item.defindex === 814 && item.quality === 1) {
            item.defindex = 835; // Genuine Triad Trinket
        } else if (item.defindex === 836 && item.quality !== 1) {
            item.defindex = 815; // Champ Stamp
        } else if (item.defindex === 815 && item.quality === 1) {
            item.defindex = 836; // Genuine Champ Stamp
        } else if (item.defindex === 837 && item.quality !== 1) {
            item.defindex = 816; // Marxman
        } else if (item.defindex === 816 && item.quality === 1) {
            item.defindex = 837; // Genuine Marxman
        } else if (item.defindex === 838 && item.quality !== 1) {
            item.defindex = 817; // Human Cannonball
        } else if (item.defindex === 817 && item.quality === 1) {
            item.defindex = 838; // Genuine Human Cannonball
        } else if (item.defindex === 30740 && item.quality !== 1) {
            item.defindex = 30720; // Arkham Cowl
        } else if (item.defindex === 30720 && item.quality === 1) {
            item.defindex = 30740; // Genuine Arkham Cowl
        } else if (item.defindex === 30741 && item.quality !== 1) {
            item.defindex = 30721; // Firefly
        } else if (item.defindex === 30721 && item.quality === 1) {
            item.defindex = 30741; // Genuine Firefly
        } else if (item.defindex === 30739 && item.quality !== 1) {
            item.defindex = 30724; // Fear Monger
        } else if (item.defindex === 30724 && item.quality === 1) {
            item.defindex = 30739; // Genuine Fear Monger
        }

        if (this.item.name.includes('Chemistry Set') && this.item.name.includes("Collector's")) {
            if (this.item.name.includes("Collector's Festive")) {
                item.defindex = 20007;
            } else if (this.item.name.includes("Collector's")) {
                item.defindex = 20006;
            } else {
                item.defindex = 20005;
            }
        } else if (this.item.name.includes('Kit Fabricator')) {
            if (this.item.name.includes('Professional Killstreak') && this.item.name.includes('Kit Fabricator')) {
                item.killstreak = 3;
            } else if (this.item.name.includes('Specialized Killstreak') && this.item.name.includes('Kit Fabricator')) {
                item.killstreak = 2;
            }
        } else if (
            this.item.name.includes('Killstreak') &&
            this.item.name.includes('Kit') &&
            !this.item.name.includes('Professional') &&
            !this.item.name.includes('Specialized')
        ) {
            // Killstreak Kit
            const baseName = this.item.name.replace('Non-Craftable Killstreak ', '').replace(' Kit', '').trim();
            item.defindex = killstreakKit.has(baseName) ? killstreakKit.get(baseName) : 6527;
            item.killstreak = 1;
        } else if (
            this.item.name.includes('Specialized Killstreak') &&
            this.item.name.includes('Kit') &&
            !this.item.name.includes('Professional')
        ) {
            // Specialized Killstreak Kit
            item.defindex = 6523;
            item.killstreak = 2;
        } else if (
            this.item.name.includes('Professional Killstreak') &&
            this.item.name.includes('Kit') &&
            !this.item.name.includes('Specialized')
        ) {
            // Professional Killstreak Kit
            item.defindex = 6526;
            item.killstreak = 3;
        } else if (this.item.name.includes('Medic Mask')) {
            item.defindex = 272; // 🤷‍♂️
        }

        if (item.paintkit && !this.item.name.includes('War Paint')) {
            const itemName = this.item.name.toLowerCase();

            if (
                (item.paintkit >= 0 && item.paintkit <= 66) ||
                (item.paintkit >= 68 && item.paintkit <= 75) ||
                (item.paintkit >= 77 && item.paintkit <= 84) ||
                [86, 91, 92, 93].includes(item.paintkit)
            ) {
                // Special Skins, but still need to filter because not everything is special

                item.defindex = itemName.includes('pistol')
                    ? pistolSkins.has(item.paintkit)
                        ? pistolSkins.get(item.paintkit)
                        : item.defindex
                    : itemName.includes('rocket launcher')
                    ? rocketLauncherSkins.has(item.paintkit)
                        ? rocketLauncherSkins.get(item.paintkit)
                        : item.defindex
                    : itemName.includes('medi gun')
                    ? medicgunSkins.get(item.paintkit)
                        ? medicgunSkins.get(item.paintkit)
                        : item.defindex
                    : itemName.includes('revolver')
                    ? revolverSkins.has(item.paintkit)
                        ? revolverSkins.get(item.paintkit)
                        : item.defindex
                    : itemName.includes('stickybomb launcher')
                    ? stickybombSkins.has(item.paintkit)
                        ? stickybombSkins.get(item.paintkit)
                        : item.defindex
                    : itemName.includes('sniper rifle')
                    ? sniperRifleSkins.has(item.paintkit)
                        ? sniperRifleSkins.get(item.paintkit)
                        : item.defindex
                    : itemName.includes('flame thrower')
                    ? flameThrowerSkins.has(item.paintkit)
                        ? flameThrowerSkins.get(item.paintkit)
                        : item.defindex
                    : itemName.includes('minigun')
                    ? minigunSkins.has(item.paintkit)
                        ? minigunSkins.get(item.paintkit)
                        : item.defindex
                    : itemName.includes('scattergun')
                    ? scattergunSkins.has(item.paintkit)
                        ? scattergunSkins.get(item.paintkit)
                        : item.defindex
                    : itemName.includes('shotgun')
                    ? shotgunSkins.has(item.paintkit)
                        ? shotgunSkins.get(item.paintkit)
                        : item.defindex
                    : itemName.includes('smg')
                    ? smgSkins.has(item.paintkit)
                        ? smgSkins.get(item.paintkit)
                        : item.defindex
                    : itemName.includes('grenade launcher')
                    ? grenadeLauncherSkins.has(item.paintkit)
                        ? grenadeLauncherSkins.get(item.paintkit)
                        : item.defindex
                    : itemName.includes('wrench')
                    ? wrenchSkins.has(item.paintkit)
                        ? wrenchSkins.get(item.paintkit)
                        : item.defindex
                    : itemName.includes('knife')
                    ? knifeSkins.has(item.paintkit)
                        ? knifeSkins.get(item.paintkit)
                        : item.defindex
                    : item.defindex;
            }
        }

        if (item.paintkit && this.item.name.includes('War Paint')) {
            const itemName = `Paintkit ${item.paintkit}`;
            if (!item.quality) {
                item.quality = 15;
            }

            const itemsCount = schemaItems.length;

            for (let i = 0; i < itemsCount; i++) {
                if (schemaItems[i].name == itemName) {
                    item.defindex = schemaItems[i].defindex;
                    break;
                }
            }
        }

        // Adds default values
        return SKU.fromString(SKU.fromObject(item));
    }

    /**
     * Returns the name of the item in the listing
     * @return {String}
     */
    getName() {
        if (this.appid !== 440) {
            return null;
        }

        return this._manager.schema.getName(this.getItem());
    }

    /**
     * Changes specific properties and adds the job to the queue
     * @param {Object} properties
     * @param {Object} [properties.currencies]
     * @param {String} [properties.details]
     * @param {Boolean} [properties.offers]
     * @param {Boolean} [properties.buyout]
     */
    update(properties) {
        if (properties.time === undefined) {
            return;
        }

        const listing = {
            time: properties.time,
            intent: this.intent
        };

        if (this.intent === 0) {
            listing.sku = this.getSKU();
            listing.promoted = 0;
        } else {
            listing.id = this.item.id;
            listing.promoted = this.item.promoted;
        }

        ['currencies', 'details', 'offers', 'buyout'].forEach(property => {
            if (properties[property] === undefined) {
                listing[property] = this[property];
            } else {
                listing[property] = properties[property];
            }
        });

        this._manager.createListing(listing, true);
    }

    /**
     * Enqueues the listing to be removed
     */
    remove() {
        this._manager.removeListing(this.id);
    }

    /**
     * Parses attributes
     * @return {Object}
     */
    _parseAttributes() {
        const attributes = {};

        if (this.item.attributes === undefined) {
            return attributes;
        }

        const attributesCount = this.item.attributes.length;

        for (let i = 0; i < attributesCount; i++) {
            const attribute = this.item.attributes[i];
            if (attribute.defindex == 2025) {
                // Killstreak tier/Killstreak Kit
                attributes.killstreak = attribute.float_value;
            } else if (attribute.defindex == 2027) {
                // Australium
                attributes.australium = true;
            } else if (attribute.defindex == 2053) {
                // Festivized
                attributes.festive = true;
            } else if (attribute.defindex == 134) {
                // Unusual effect for cosmetics
                attributes.effect = attribute.float_value;
            } else if (attribute.defindex == 2041) {
                // Unusual effect for Taunt
                attributes.effect = attribute.value;
            } else if (attribute.defindex == 834) {
                // War paint/Skins
                attributes.paintkit = attribute.value;
            } else if (attribute.defindex == 725) {
                // Wear
                attributes.wear = parseInt(parseFloat(attribute.float_value) * 5);
            } else if (attribute.defindex == 214) {
                // Strange as second quality
                if (this.item.quality !== 11) {
                    attributes.quality2 = 11;
                }
            } else if (attribute.defindex == 187) {
                // Crates
                attributes.crateseries = attribute.float_value;
            } else if (attribute.defindex == 2012) {
                // Target - Unusualifier/Strangifier/Killstreak Kit
                const value = parseInt(attribute.float_value);
                attributes[value > 6000 && value < 30000 ? 'output' : 'target'] = value;
            } else if (attribute.defindex == 142) {
                // Painted items, do not apply if it's a Paint Can
                if (
                    ![
                        5023, // Paint Can
                        5027, // Indubitably Green
                        5028, // Zepheniah's Greed
                        5029, // Noble Hatter's Violet
                        5030, // Color No. 216-190-216
                        5031, // A Deep Commitment to Purple
                        5032, // Mann Co. Orange
                        5033, // Muskelmannbraun
                        5034, // Peculiarly Drab Tincture
                        5035, // Radigan Conagher Brown
                        5036, // Ye Olde Rustic Colour
                        5037, // Australium Gold
                        5038, // Aged Moustache Grey
                        5039, // An Extraordinary Abundance of Tinge
                        5040, // A Distinctive Lack of Hue
                        5046, // Team Spirit
                        5051, // Pink as Hell
                        5052, // A Color Similar to Slate
                        5053, // Drably Olive
                        5054, // The Bitter Taste of Defeat and Lime
                        5055, // The Color of a Gentlemann's Business Pants
                        5056, // Dark Salmon Injustice
                        5060, // Operator's Overalls
                        5061, // Waterlogged Lab Coat
                        5062, // Balaclavas Are Forever
                        5063, // An Air of Debonair
                        5064, // The Value of Teamwork
                        5065, // Cream Spirit
                        5076, // A Mann's Mint
                        5077 // After Eight
                    ].includes(this.item.defindex)
                ) {
                    attributes.paint = attribute.float_value;
                }
            } else if (
                [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007].includes(attribute.defindex) &&
                attribute.is_output == true
            ) {
                if (attribute.attributes === undefined) {
                    attributes.outputQuality = parseInt(attribute.quality);

                    if (attributes.outputQuality === 14) {
                        // Chemistry Set Collector's
                        attributes.output = parseInt(attribute.itemdef);
                    } else {
                        // Chemistry Set Strangifier
                        attributes.target = parseInt(attribute.itemdef);
                    }
                } else {
                    // Killstreak Fabricator Kit: getting output, outputQuality and target
                    attributes.output = attribute.itemdef;
                    attributes.outputQuality = attribute.quality;

                    const attributes2 = attribute.attributes;
                    const attributes2Count = attributes2.length;

                    for (let i = 0; i < attributes2Count; i++) {
                        const attributes2Element = attributes2[i];
                        if (attributes2Element.defindex == 2012) {
                            const value = attributes2Element.float_value;
                            if (typeof value === 'string') {
                                attributes.target = parseInt(value);
                            } else {
                                attributes.target = value;
                            }
                        }
                    }
                }
            }
        }

        return attributes;
    }
}

module.exports = Listing;
