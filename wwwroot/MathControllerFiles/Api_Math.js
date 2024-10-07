const TESTS = [
    'op=+&x=-111&y=-244',
    'op=-&x=1&y=abc',
    'n=a&op=p',
    'op=-&x=111&y=244',
    'op=*&x=11.56&y=244.12345',
    'op=/&x=99&y=11.06',
    'op=/&x=99&y=0',
    'op=/&x=0&y=0',
    'op=%&x=5&y=5',
    'op=%&x=100&y=13',
    'op=%&x=100&y=0',
    'op=%&x=0&y=0',
    'n=0&op=!',
    'n=0&op=p',
    'n=1&op=p',
    'n=2&op=p',
    'n=5&op=p',
    'n=6&op=p',
    'n=6.5&op=p',
    'n=113&op=p',
    'n=114&op=p',
    'n=1&op=np',
    'n=30&op=np',
    'X=111&op=+&y=244',
    'Y=244&op=+&x=111',
    'op=+&x=111&y=244&z=0',
    'n=5&op=!&z=0',
    'n=5.5&op=!',
    'z=0',
    'n=-5&op=!',
    'x=null'
]
let NombreErreur = 0;
//A ne pas ouvrir
function calculerClientResult(params) {
    var { op, x, y, n } = params;
    let value = 0;

    let count = Object.keys(params).length;



    if (op != null) {
        op == ' ' ? op = "+" : op;
        if (n != null && x == null && y == null && count <= 2) {
            if (isNaN(n)) {
                value = "n parameter is not a number";
            }
            else if (Math.abs(n % 1) != 0 || n < 1) {
                value = "n parameter must be an integer > 0";
            }
            else {
                n = parseInt(n);
                switch (op) {
                    case '!':
                        value = factorial(n);

                        break;
                    case 'p':
                        value = isPrime(n);
                        break;
                    case 'np':
                        value = findPrime(n);
                        break;

                }
            }


        } else if (x != null && y != null && n == null && count <= 3) {

            if (isNaN(x)) {
                value = "x parameter is not a number";
            } else if (isNaN(y)) {
                value = "y parameter is not a number";
            } else {
                x = parseFloat(x);
                y = parseFloat(y);

                switch (op) {
                    case '+':
                        value = x + y;

                        break;
                    case '-':
                        value = x - y;

                        break;
                    case '*':
                        value = x * y;

                        break;
                    case '/':
                        if (x == 0 && y == 0) {
                            value = 'NaN';
                        }
                        else if (x == 0 || y == 0) {
                            value = "Infinity"
                        } else {
                            value = x / y;
                        }
                        break;
                    case '%':
                        if (x == 0 || y == 0) {
                            value = "NaN"
                        } else {
                            value = x % y;
                        }
                        break;
                }
            }

        } else {
            let operatorsXY = ['+', '-', '*', '/', '%'];
            let operatorsN = ['!', 'p', 'np'];
            let isError = false;
            let str = "";

            if (operatorsXY.includes(op)) {
                if (x == null) { str = "'x' parameter is missing"; isError = true; }
                if (y == null) { str = "'y' parameter is missing"; isError = true; }
                if (count > 3) { str = "Too many parameters"; isError = true; }

            }
            if (operatorsN.includes(op)) {
                if (n == null) { str = "'n' parameter is missing"; isError = true; }
                if (count > 2) { str = "Too many parameters"; isError = true; }
            }
            if (isError == true) {
                value = str;

            }
        }
    } else {
        value = "'op' parameter is missing";
    }
    return value;
}


function showRes(res) {
    let resultDiv = document.getElementById("results");

    const { value, error, ...param } = res;
    const clientResult = calculerClientResult(param);

    if (clientResult === value || clientResult === error) {
        resultDiv.innerHTML += `<p><strong>OK ---> ${JSON.stringify(res)}</strong></p>`;
    } else {
        resultDiv.innerHTML += `<p><strong>ERROR ---> ${JSON.stringify(res)}</strong></p>`;
        NombreErreur++;
        console.log('Client:', typeof (clientResult), clientResult, 'Serveur Erreur:', typeof (error), error)

    }
}
async function getResult(url) {
    let p = [];
    NombreErreur = 0;
    for (let i = 0; i < TESTS.length; i++) {

        p.push(GetPromise(url, '?' + TESTS[i], showRes));

    }

    await Promise.all(p);
    let Verdict = document.getElementById("verdict");
    Verdict.innerHTML = "";
    if (NombreErreur == 0) {
        Verdict.innerHTML += 'Bravo !!! Aucun problème'
    } else {
        Verdict.innerHTML += `Il se trouve que tu es pas bon et tu as ${NombreErreur} erreurs`;
    }

}


async function GetPromise(url, query, func) {

    return new Promise(resolve => {
        $.ajax({
            url: url + query,
            type: "GET",
            contentType: 'application/json',
            success: res => { func(res); resolve(res); }
        });
    });
}

document.getElementById("exec").addEventListener("click", function () {
    getResult(document.getElementById("url").value);
    document.getElementById("results").innerHTML = "";
});

document.getElementById("aide").addEventListener("click", function () {
    GetPromise(document.getElementById("url").value, '?', (res) => {
        //console.log(res)
        window.location.href = res.redirect + ".html";
    })
});

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
function isPrime(value) {
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}
function findPrime(n) {
    let primeNumber = 0;
    for (let i = 0; i < n; i++) {
        primeNumber++;
        while (!isPrime(primeNumber)) {
            primeNumber++;
        }
    }
    return primeNumber;
}