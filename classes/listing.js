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
        const schemaItemByName = this._manager.schema.raw.schema.items.find(
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
            const baseName = this.item.name.replace('Non-Craftable Killstreak ', '').replace(' Kit', '').trim();
            item.defindex = killstreakKit.has(baseName) ? killstreakKit.get(baseName) : 6527;
        } else if (
            this.item.name.includes('Specialized Killstreak') &&
            this.item.name.includes('Kit') &&
            !this.item.name.includes('Professional')
        ) {
            // Specialized Killstreak Kit
            item.defindex = 6523;
        } else if (
            this.item.name.includes('Professional Killstreak') &&
            this.item.name.includes('Kit') &&
            !this.item.name.includes('Specialized')
        ) {
            // Professional Killstreak Kit
            item.defindex = 6526;
        } else if (this.item.name.includes('Medic Mask')) {
            item.defindex = 272; // 🤷‍♂️
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
