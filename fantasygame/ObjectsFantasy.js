
/////////////
//FUNCTIONS//
/////////////

var reset = function () {	
	pointsToSpend = 10;
	$('.pointsToSpend').text('');
	$('.pointsToSpend').append(pointsToSpend);
	$('input[name=name]').val('');
	$('input[name=strength]').val(10);
	$('input[name=dexterity]').val(10);
	$('input[name=consitution]').val(10);
	$('.character-creation').show('slow');
};

 var diceRoll = function (sides) {
	return Math.floor(Math.random()*sides) +1;
};

//Enemy Creation Medthod

function Enemy(name,health,armorClass,damageRange,damageMultiplier, exp, image) {
  this.name = name;
  this.totalHealth = health;
  this.health = health;
  this.armorClass = armorClass;
  this.damageRange = damageRange;
  this.damageMultiplier = damageMultiplier;
  this.exp = exp;
  this.image = image;

  //Attack Damage

	this.damage = function () {
		var weaponRandom = 0;
		for (var i = 0; i < this.damageMultiplier; i++) {
		weaponRandom += diceRoll(this.damageRange);
		console.log(weaponRandom);
	} 

		var attackDamage = weaponRandom;
		if (attackRoll >= 20 ) {
			attackDamage *= 2.5
			console.log(attackDamage);
			attackDamage = Math.floor(attackDamage);
		}
		return attackDamage;
	};

	//Attack Chance

		this.basicAttack = function() {
		attackRoll = diceRoll(20);
		var chanceToHit = attackRoll;
		return chanceToHit;
	};
};

var generateCharacter = function(){

	$('.remove').remove();
	$('.right-avitar').css("background-image", "url('img/"+character.enemy.image+".jpg')");
	$('.right-avitar').prepend('<h3 class="remove" style="text-align: right;">'+character.enemy.name+'</h3>');
	$('.left-avitar').prepend('<h3 class="remove" style="text-align: left;">'+character.name+'</h3>');
	$('.mcStats').after('<p class="remove" > HP: '+character.health + ' / ' + character.totalHealth + '</p>');
	$('.enStats').after('<p class="remove" style="text-align: right;"> HP: '+character.enemy.health + ' / ' + character.enemy.totalHealth + '</p>');
	$('.readout').remove();
	$('.battle-readout').append('<h4 class="readout">Time to Fight!</h4>');
};

var battleEnd = function(){
	$('.battle').hide('fast');
	$('.foes').show('fast');
	$('.character-sheetmin').show('fast');
	$('.remove').remove();
	character.enemy.health = character.enemy.totalHealth;
	character.enemy = "none";
};

var gameOver = function(){
	$('.battle').hide('fast');
	$('.game-over').show('fast');
};

/////////////
//VARIABLES//
/////////////

var pointsToSpend;
var strengthModifier;
var consitutionModifier; 
var dexterityModifier;
var attackRoll = 0;
var character = {};

//Armor

var chainmail = {
	name: "Chainmail Armor",
	armorRating: 5,
	rarity: "Common",
	armorType: "Medium",
	value: 30
}

//Weapons

var basicSword = {
	name: "Basic Sword",
	weaponModifier: 2,
	attackRandom: 6,
	randomMultiplier: 1,
	type: "Sword",
	rarity: "Common",
	value: 15
}

//Beastery

var forestHare = new Enemy("Forest Hare", 10, 9, 3, 1, 10, "ForestHare");
var goblinFisher = new Enemy("Goblin Fisher", 20, 13, 8, 1, 100, "GoblinFisher"); 




//start to build a character

//Plus and minus point buy system
pointsToSpend = 10;

	jQuery(document).ready(function(){
		$('.pointsToSpend').append(pointsToSpend);
	    // This button will increment the value
	    $('.qtyplus').click(function(e){
	        // Stop acting like a button
	        e.preventDefault();
	        // Get the field name
	        fieldName = $(this).attr('field');
	        // Get its current value
	        var currentVal = parseInt($('input[name='+fieldName+']').val());
	        // If is not undefined
	       if (pointsToSpend === 0) {
	        	$('input[name='+fieldName+']').val(currentVal + 0);
	        } else if (pointsToSpend === 1) {
	        	$('input[name='+fieldName+']').val(currentVal + 1);
	        	pointsToSpend -= 1;
	        	$('.statSubmit').show('slow');
	        } else if (!isNaN(currentVal)) {
	            // Increment
	            $('input[name='+fieldName+']').val(currentVal + 1);
	            pointsToSpend -= 1;
	        } else {
	            // Otherwise put a 0 there
	            $('input[name='+fieldName+']').val(0);
	        }
	        $('.pointsToSpend').text("")
	       	$('.pointsToSpend').append(pointsToSpend);
	    });
	    // This button will decrement the value till 0
	    $(".qtyminus").click(function(e) {
	        // Stop acting like a button
	        e.preventDefault();
	        // Get the field name
	        fieldName = $(this).attr('field');
	        // Get its current value
	        var currentVal = parseInt($('input[name='+fieldName+']').val());
	        // If it isn't undefined or its greater than 0
	        if (!isNaN(currentVal) && currentVal > 10) {
	            // Decrement one
	            $('input[name='+fieldName+']').val(currentVal - 1);
	            pointsToSpend += 1;
	            $('.statSubmit').hide('slow');
	        } else {
	            // Otherwise put a 0 there
	            $('input[name='+fieldName+']').val(10);
	        }
	        $('.pointsToSpend').text("")
	        $('.pointsToSpend').append(pointsToSpend);
	    });
	});


//Submit button to creat character
$('.statSubmit').click(function() {
	//Sets Character's Stats that generate other scores
	character.name = $('input[name=name]').val();
	character.strength = parseInt($('input[name=strength]').val());
	character.dexterity = parseInt($('input[name=dexterity]').val());
	character.consitution = parseInt($('input[name=consitution]').val());
	character.exp = 0;
	
	//Sets the modifiers that most of the score generaters take.
	strengthModifier = Math.floor((character.strength - 10) / 2);
	consitutionModifier = Math.floor((character.consitution - 10) / 2); 
	dexterityModifier = Math.floor((character.dexterity - 10) / 2);
	
	//Determines total health.
	character.totalHealth = 0; 
	for (var i = 0; i < 1 + consitutionModifier; i++) {
		character.totalHealth += diceRoll(6);
		console.log(character.totalHealth);
	} 
	character.totalHealth = character.totalHealth + consitutionModifier + 10;

	character.health = character.totalHealth;

	//Basic Equiptment
	character.armor = chainmail;
	character.weapon = basicSword;
	character.sharpeningStone = false;

	//Armor Class
	character.armorClass = character.armor.armorRating + dexterityModifier + 10;

	//Expanded Critical
	character.criticalRange = 20 - dexterityModifier;

	//Attack Damage

	character.damage = function () {
		var weaponRandom = 0;
		for (var i = 0; i < character.weapon.randomMultiplier; i++) {
		weaponRandom += diceRoll(character.weapon.attackRandom);
		console.log(weaponRandom);
	} 

		var attackDamage = character.weapon.weaponModifier + weaponRandom + strengthModifier;
		if (character.sharpeningStone === true) { attackDamage += 1};
		if (attackRoll >= character.criticalRange ) {
			attackDamage *= 2.5
			console.log(attackDamage);
			attackDamage = Math.floor(attackDamage);
		}
		return attackDamage;
	};

	//Attack Chance

		character.basicAttack = function() {
		attackRoll = diceRoll(20);
		var chanceToHit = strengthModifier + character.weapon.weaponModifier + attackRoll;
		return chanceToHit;
	};

	$('.character-creation').hide('fast');
	$('.character-sheet').show('fast');
	$('.character-confirm').show('fast');
	$('input[name="character_name"]').val(character.name);
	$('input[name="character_health"]').val(character.totalHealth);
	$('input[name="character_strength"]').val(character.strength);
	$('input[name="character_dexterity"]').val(character.dexterity);
	$('input[name="character_consitution"]').val(character.consitution);
	$('input[name="character_weapon"]').val(character.weapon.name);
	$('input[name="character_weaponMod"]').val(character.weapon.weaponModifier);
	$('input[name="character_AttDie"]').val(character.weapon.randomMultiplier + "d" + character.weapon.attackRandom);
	$('input[name="character_armor"]').val(character.armor.name);
	$('input[name="character_armorRating"]').val(character.armor.armorRating);
});


//Move foraward with the character made.
$('.confirm').click(function(){
	$('.character-sheet').hide('fast');
	$('.character-confirm').hide('fast');
	$('.statSubmit').hide('fast');
	$('.character-sheetmin').show('fast');
	$('.foes').show('fast');
});

//Try making a new character instead.
$('.try-again').click(function(){
	$('.character-sheet').hide('fast');
	$('.character-confirm').hide('fast');
	$('.statSubmit').hide();
	reset();
});

//Minimize Character Sheet
$('.character-sheetmin').click(function(){
	$('.character-sheetmin').hide('fast');
	$('.foes').hide('fast');
	$('.character-sheet').show('fast');
	$('.character-confirm').show('fast');
});


/////////////////
//BATTLE SYSTEM//
/////////////////

$('.forHare').click(function(){
	character.enemy = forestHare;
	console.log(character.enemy.name);
	generateCharacter();
});

$('.gobFish').click(function(){
	character.enemy = goblinFisher;
	console.log(character.enemy.name);
	generateCharacter();
	});

//When any foe is selected start battle
$('.battlefoe').click(function(){
	$('.foes').hide('fast');
	$('.character-sheetmin').hide('fast');
	$('.battle').show('fast');
});

$('.new-game').click(function(){
	$('.game-over').hide('fast');
	reset();
});


//The choices you can make in battle. 
function battleChoice (type) {
  
	//Using an object litteral instead of a switch statement.
	var battle = {
    'attack': function () {

    	var enemyReadout="";
    	var enemyAttackAttempt = function () {
			var enemyAttack = character.enemy.basicAttack();
				console.log(enemyAttack);
				if (enemyAttack >= character.armorClass) {
					var enemyHit = character.enemy.damage();
					enemyReadout = (character.enemy.name + "'s attack hit for " + enemyHit + " damage!");
					character.health -= enemyHit;
					console.log('charcter health:' + character.health);
				}
				if (character.health <= 0) {
					console.log("Game Over")
					gameOver();
					character.health = character.totalHealth;
				}
			};

    	if (character.enemy === "none") {
    		return console.log("You have no enemy to attack.");
    	}
      var attackAttempt = character.basicAttack();
      console.log(attackAttempt);
		if ( attackAttempt >= character.enemy.armorClass) {
			var hit = character.damage();
			var charReadout = (character.name +"'s attack hit for " + hit + " damage!");
			character.enemy.health -= hit;
			console.log(character.enemy.health);
			if (character.enemy.health <= 0) {
				character.enemy.health = 0;
				var charReadout = ("You defeated the " + character.enemy.name + "!");
				$('.battle-readout').append('<h4 class="readout">' + charReadout + '</h4>');
				character.exp += character.enemy.exp;
				alert('Current Exp = ' + character.exp);
				battleEnd();
			} else {
				console.log(character.enemy.name + " has " + character.enemy.health + " hit points remaining.");
					enemyAttackAttempt();
					}
		} else {
			var charReadout = ("Attack missed.");
			enemyAttackAttempt();
		}
		//Updates hit point totals.
		$('p .remove').remove();
		$('p.remove').remove();
		$('.mcStats').after('<p class="remove" > HP: '+character.health + ' / ' + character.totalHealth + '</p>');
		$('.enStats').after('<p class="remove" style="text-align: right;"> HP: '+character.enemy.health + ' / ' + character.enemy.totalHealth + '</p>');


		//Shows what happened.
		$('.readout').remove();
		$('.battle-readout').append('<h4 class="readout">' + charReadout + '</h4>');
		$('.battle-readout').append('<h4 class="readout">' + enemyReadout + '</h4>');
    },
    'flee': function () {
    	if (character.enemy === "none") {
    		console.log("You have no one to run from.")
    	}
      	console.log ("You ran from " + character.enemy.name + ".")
       	character.enemy.health = character.enemy.totalHealth;
      	character.enemy = "none"
      	battleEnd();
    }
  };
  return battle[type];
}

$('.attack').click(battleChoice('attack'));
$('.flee').click(battleChoice('flee'));




