function getRandomInt(max = 100) {
    return Math.floor(Math.random() * Math.floor(max));
}

var exp = {}
exp.Int = getRandomInt;

export default exp;