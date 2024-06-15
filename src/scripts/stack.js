let personOne;
let personTwo;
let n;
let phiN;
let e;
let d;
let tmpD;
let privateKey;
let publicKey;
let alphabet = ['а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї', 'й', 'к', 'л', 'м',
    'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я', ' ', '.', ',', '?', '!', '-'];

function algorithmRSA() {
    n = 0;
    phiN = 0;
    e = 0;
    d = 0;

    if (inputPersonOne.value === "" || inputPersonTwo.value === "") {
        alert("Введіть значення");
    } else {
        console.log("===========================");

        //
        personOne = parseInt(inputPersonOne.value);
        while (!simplicityCheck(personOne)) {
            personOne ++;
        }
        console.log("personOne = " + personOne);

        //
        personTwo = parseInt(inputPersonTwo.value);
        while (!simplicityCheck(personTwo)) {
            personTwo ++;
        }
        console.log("personTwo = " + personTwo);

        n = personOne * personTwo;
        console.log("n =" + n);

        phiN = (personOne - 1) * (personTwo - 1);
        console.log("phiN = " + phiN);

        //
        for (let i = Math.round(phiN); i > 2; i--) {
            if (simplicityCheck(i) === true) {
                e = i;

                //
                for (let j = 2; j < phiN; j++) {
                    tmpD = (phiN * j + 1) / e;
                    if (Number.isInteger(tmpD) === true) {
                        if (tmpD !== e && simplicityCheck(tmpD) === true && (e * tmpD) % phiN === 1) {
                            d = tmpD;
                            break;
                        }
                    }
                }
                if (d !== 0 && d !== e) {
                    break;
                }
            }
        }
        if (d === 0) {
            return alert("Помилка! Неможливо знайти ключ");
        }

        console.log("e = " + e);
        console.log("d = " + d);
        console.log("e*d = " + e * d);
        console.log("e*d % phiN = " + (e * d) % phiN);

        privateKey = "PrivateKey: ( " + d + ", " + n + ")";
        publicKey = "PublicKey: ( " + e + ", " + n + ")";
        document.getElementById("privateKeyLabel").textContent = privateKey;
        document.getElementById("publicKeyLabel").textContent = publicKey;
    }
}

function simplicityCheck(number) {
    //
    if (number <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.floor(Math.sqrt(number)); i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}

function encryption() {
    //
    if (inputPersonOne.value === "" || inputPersonTwo.value === "") {
        alert("Згенеруйте ключі");
    } else {
        if (inputText.value === "") {
            alert("Введіть текст");
        }else {
            console.log("==encryption==");
            let clearText = (inputText.value).toLowerCase().split('');
            console.log(clearText)
            let cipherText = [];
            for (let i = 0; i < clearText.length; i++) {
                let letter = clearText[i];
                let letterIndex
                for (let j = 0; j < alphabet.length; j++) {
                    if (letter === alphabet[j]) {
                        letterIndex = j;
                        break;
                    }
                }

                if (letterIndex == null) {
                    return alert("Введіть українською");
                }
                let exponentiation = (BigInt(letterIndex) ** BigInt(e));
                console.log(letterIndex + "^e = " + exponentiation);
                let cipherLetter = exponentiation % BigInt(n);
                console.log(letter + " = " + letterIndex + " = " + cipherLetter);
                cipherText.push(cipherLetter);
            }
            console.log(cipherText);
            document.getElementById("cipherTextLabel").textContent = cipherText;
        }
    }
}

function decryption() {
    if (cipherTextLabel.value === "") {
        alert("Зашифруйте текст");
    } else {
        console.log("==decryption==");
        let decryptionText = [];
        let cipherText = (cipherTextLabel.textContent).split(",");
        for (let i = 0; i < cipherText.length; i++) {
            let decryptionLetter;
            let exponentiation = (BigInt(letterIndex) ** BigInt(d));
            console.log(cipherText + "^d = " + exponentiation);
            let decryptionLetterIndex = exponentiation % BigInt(n);
            console.log(decryptionLetterIndex);
            for (let j = 0; j < alphabet.length; j++) {
                if (decryptionLetterIndex === BigInt(j)) {
                    decryptionLetter = alphabet[j];
                    break;
                }
            }
            decryptionText.push(decryptionLetter);
        }
        console.log(decryptionText);
        document.getElementById("decryptionTextLabel").textContent = decryptionText;
    }
}