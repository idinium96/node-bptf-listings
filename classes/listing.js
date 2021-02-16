const SteamID = require('steamid');
const Currencies = require('tf2-currencies');
const SKU = require('tf2-sku-2');

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
    constructor (listing, manager) {
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
    getSKU () {
        if (this.appid !== 440) {
            return null;
        }

        return SKU.fromObject(this.getItem());
    }

    /**
     * Returns the item in the listings
     * @return {Object}
     */
    getItem () {
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
        const schemaItemByName = this._manager.schema.raw.schema.items.find((v) => v.name === schemaItem.item_name && schemaItem.item_quality !== 0);

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
            item.defindex = 810 // Red-Tape Recorder
        } else if (item.defindex === 810 && item.quality === 1) {
            item.defindex = 831 // Genuine Red-Tape Recorder
        } else if (item.defindex === 832 && item.quality !== 1) {
            item.defindex = 811 // Huo-Long Heater
        } else if (item.defindex === 811 && item.quality === 1) {
            item.defindex = 832 // Genuine Huo-Long Heater
        } else if (item.defindex === 833 && item.quality !== 1) {
            item.defindex = 812 // Flying Guillotine
        } else if (item.defindex === 812 && item.quality === 1) {
            item.defindex = 833 // Genuine Flying Guillotine
        } else if (item.defindex === 834 && item.quality !== 1) {
            item.defindex = 813 // Neon Annihilator
        } else if (item.defindex === 813 && item.quality === 1) {
            item.defindex = 834 // Genuine Neon Annihilator
        } else if (item.defindex === 835 && item.quality !== 1) {
            item.defindex = 814 // Triad Trinket
        } else if (item.defindex === 814 && item.quality === 1) {
            item.defindex = 835 // Genuine Triad Trinket
        } else if (item.defindex === 836 && item.quality !== 1) {
            item.defindex = 815 // Champ Stamp
        } else if (item.defindex === 815 && item.quality === 1) {
            item.defindex = 836 // Genuine Champ Stamp
        } else if (item.defindex === 837 && item.quality !== 1) {
            item.defindex = 816 // Marxman
        } else if (item.defindex === 816 && item.quality === 1) {
            item.defindex = 837 // Genuine Marxman
        } else if (item.defindex === 838 && item.quality !== 1) {
            item.defindex = 817 // Human Cannonball
        } else if (item.defindex === 817 && item.quality === 1) {
            item.defindex = 838 // Genuine Human Cannonball
        } else if (item.defindex === 30740 && item.quality !== 1) {
            item.defindex = 30720 // Arkham Cowl
        } else if (item.defindex === 30720 && item.quality === 1) {
            item.defindex = 30740 // Genuine Arkham Cowl
        } else if (item.defindex === 30741 && item.quality !== 1) {
            item.defindex = 30721 // Firefly
        } else if (item.defindex === 30721 && item.quality === 1) {
            item.defindex = 30741 // Genuine Firefly
        } else if (item.defindex === 30739 && item.quality !== 1) {
            item.defindex = 30724 // Fear Monger
        } else if (item.defindex === 30724 && item.quality === 1) {
            item.defindex = 30739 // Genuine Fear Monger
        }

        if (this.item.name.includes('Chemistry Set')) {
            if (this.item.name.includes("Collector's Festive") && this.item.name.includes('Chemistry Set')) {
                item.defindex = 20007;
            } else if (this.item.name.includes("Collector's") && this.item.name.includes('Chemistry Set')) {
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
            if (this.item.name.includes('Rocket Launcher')) item.defindex = 5726;
            else if (this.item.name.includes('Scattergun')) item.defindex = 5727;
            else if (this.item.name.includes('Sniper Rifle')) item.defindex = 5728;
            else if (this.item.name.includes('Shotgun')) item.defindex = 5729;
            else if (this.item.name.includes('Ubersaw')) item.defindex = 5730;
            else if (this.item.name.includes('Gloves of Running Urgently')) item.defindex = 5731;
            else if (this.item.name.includes('Spy-cicle')) item.defindex = 5732;
            else if (this.item.name.includes('Axtinguisher')) item.defindex = 5733;
            else if (this.item.name.includes('Stickybomb Launcher')) item.defindex = 5743;
            else if (this.item.name.includes('Minigun')) item.defindex = 5744;
            else if (this.item.name.includes('Direct Hit')) item.defindex = 5745;
            else if (this.item.name.includes('Huntsman')) item.defindex = 5746;
            else if (this.item.name.includes('Backburner')) item.defindex = 5747;
            else if (this.item.name.includes('Back Scatter')) item.defindex = 5748;
            else if (this.item.name.includes('Kritzkrieg')) item.defindex = 5749;
            else if (this.item.name.includes('Ambassador')) item.defindex = 5750;
            else if (this.item.name.includes('Frontier Justice')) item.defindex = 5751;
            else if (this.item.name.includes('Flare Gun')) item.defindex = 5793;
            else if (this.item.name.includes('Wrench')) item.defindex = 5794;
            else if (this.item.name.includes('Revolver')) item.defindex = 5795;
            else if (this.item.name.includes('Machina')) item.defindex = 5796;
            else if (this.item.name.includes("Baby Face's Blaster")) item.defindex = 5797;
            else if (this.item.name.includes('Huo-Long Heater')) item.defindex = 5798;
            else if (this.item.name.includes('Loose Cannon')) item.defindex = 5799;
            else if (this.item.name.includes('Vaccinator')) item.defindex = 5800;
            else if (this.item.name.includes('Air Strike')) item.defindex = 5801;
            else item.defindex = 6527;
        }

        // Adds default values
        return SKU.fromString(SKU.fromObject(item));
    }

    /**
     * Returns the name of the item in the listing
     * @return {String}
     */
    getName () {
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
    update (properties) {
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

        ['currencies', 'details', 'offers', 'buyout'].forEach((property) => {
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
    remove () {
        this._manager.removeListing(this.id);
    }

    /**
     * Parses attributes
     * @return {Object}
     */
    _parseAttributes () {
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
                attributes.target = attribute.float_value;
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
                    // Chemistry Set Collector's - getting output and outputQuality
                    attributes.output = parseInt(attribute.itemdef);
                    attributes.outputQuality = parseInt(attribute.quality);
                } else {
                    // Chemistry Set Strangifier and Killstreak Fabricator Kit: getting output, outputQuality and target
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
