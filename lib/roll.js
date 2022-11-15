import minimist from 'minimist';
const args = minimist(process.argv.slice(2));

export function roll(sides, dice, rolls) {

    var results = [];

    for (i = 0; i<rolls; i++){

        var number = 0;

        for (j = 0; j<dice; j++){
            number += Math.floor(Math.random() * 6) + 1
        }

        results.push(number)
    }

    const results = {
		"sides": sides,
		"dice": dices,
		"rolls": rolls,
		"results": resultArr
	};

    return results;

}