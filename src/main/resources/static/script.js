const billettListe = [];
const billetter = document.getElementById("billetter");
const film = document.getElementById("film");
const antall = document.getElementById("antall");
const fornavn = document.getElementById("fornavn");
const etternavn = document.getElementById("etternavn");
const telefon = document.getElementById("telefon");
const epost = document.getElementById("epost");

const feil = {};

const validerInput = () => {
    if (film.value === "") visFeilmelding("film");
    else fjernFeilmelding("film");

    if (!antall.value || antall.value < 1 || antall.value > 10) visFeilmelding("antall");
    else fjernFeilmelding("antall");

    if (fornavn.value === "") visFeilmelding("fornavn");
    else fjernFeilmelding("fornavn");

    if (etternavn.value === "") visFeilmelding("etternavn");
    else fjernFeilmelding("etternavn");

    if (telefon.value === "" || !validatePhoneNumber(telefon.value)) visFeilmelding("telefon");
    else fjernFeilmelding("telefon");

    if (epost.value === "" || !validateEmail(epost.value)) visFeilmelding("epost");
    else fjernFeilmelding("epost");

    if (Object.keys(feil).length === 0) leggTilBillett();
}

const visFeilmelding = type => {
    feil[type] = true;
    const feilmelding = document.getElementById(type + "Error");
    feilmelding.setAttribute("aria-hidden", false);
    feilmelding.setAttribute("aria-invalid", true);
    feilmelding.classList.add("visible");
}

const fjernFeilmelding = type => {
    delete feil[type];
    const feilmelding = document.getElementById(type + "Error");
    feilmelding.setAttribute("aria-hidden", true);
    feilmelding.setAttribute("aria-invalid", false);
    feilmelding.classList.remove("visible");
}

const validatePhoneNumber = number => {
    const regex = /^\d{8}$/;
    return regex.test(number);
}

const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const leggTilBillett = () => {
    const billett = {
        film: film.value,
        antall: antall.value,
        fornavn: fornavn.value,
        etternavn: etternavn.value,
        telefon: telefon.value,
        epost: epost.value
    }

    billettListe.push(billett);

    oppdaterBilletter();

    fjernAlleInput();
}

const fjernAlleInput = () => {
    film.value = "";
    antall.value = "";
    fornavn.value = "";
    etternavn.value = "";
    telefon.value = "";
    epost.value = "";
}

const slettAlleBilletter = () => {
    billettListe.splice(0, billettListe.length);
    oppdaterBilletter();
}

const oppdaterBilletter = () => {
    billetter.innerHTML = "";
    billettListe.forEach(billett => {
        billetter.innerHTML += `
        <tr>
            <td>${billett.film}</td>
            <td>${billett.antall}</td>
            <td>${billett.fornavn}</td>
            <td>${billett.etternavn}</td>
            <td>${billett.telefon}</td>
            <td>${billett.epost}</td>
        </tr>
        `
    });
}