var minimumValue = document.getElementById('minvalue');
var maximumValue = document.getElementById('maxvalue');




function submit(){
    alert("Grænsen er sat til: " + minimumValue.value + " - " + maximumValue.value);

    var indeKlimaLimits = document.getElementById('indeKlimaLimits').value;
    var tekAnlLimits = document.getElementById('tekAnlLimits').value;
    var udvBelLimits = document.getElementById('udvBelLimits').value;
    var murFacLimits = document.getElementById('murFacLimits').value;
    var tagLimits = document.getElementById('tagLimits').value;
    var udhGavLimits = document.getElementById('udhGavLimits').value;
    var tagDaekLimits = document.getElementById('tagDækLimits').value;
    var tagrenNedløbLimits = document.getElementById('tagrenNedløbLimits').value;
    var vinUdvDoereLimits = document.getElementById('vinUdvDøreLimits').value;
    var funSokkelLimits = document.getElementById('funSokkelLimits').value;

    var data = [indeKlimaLimits, tekAnlLimits, udhGavLimits, murFacLimits, tagLimits, udhGavLimits, tagDaekLimits, tagrenNedløbLimits, vinUdvDoereLimits, funSokkelLimits];
}