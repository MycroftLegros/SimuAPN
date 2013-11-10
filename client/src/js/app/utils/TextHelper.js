var METRES_VERS_PIEDS = 3.2808399;


TextHelper = function(configuration){
    this.configuration = configuration;
};


TextHelper.prototype.distanceAffichable = function(distance) {
    if(this.configuration.systemeMesure === "IMPERIAL") {
        return (distance * METRES_VERS_PIEDS).toFixed(2) + " ft";
    } else {
        return distance.toFixed(2) + " m";
    }
};

module.exports = TextHelper;