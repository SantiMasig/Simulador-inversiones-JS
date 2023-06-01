//Buscar elementos en el DOM
const inputName = document.getElementById("name");
const inputSurname = document.getElementById("surname");
const bttnInput = document.getElementById("send");
const firtsDiv = document.getElementById("welcome");
const heyDiv = document.getElementById("hey");
const divInv = document.getElementById("divInv");
const divResul = document.getElementById("resultado");

//Array de Riesgos
const riesgos = [
  {
    tipo: "bajo",
    tasa: 0.5,
  },
  {
    tipo: "medio",
    tasa: 0.8,
  },
  {
    tipo: "alto",
    tasa: 1.5,
  },
];

//Clase Banco
class Banco {
  constructor(nombre) {
    (this.nombre = nombre), (this.rendimiento = Math.floor(Math.random() * 20));
  }
}

const bancos = [];
bancos.push(new Banco("NuBank"));
bancos.push(new Banco("Itau"));
bancos.push(new Banco("Banco Buenos Aires"));
bancos.push(new Banco("Spain Bank"));
console.log(bancos);

bttnInput.onclick = () => {
  if (inputName.value && inputSurname.value) {
    const user = {
      name: inputName.value,
      surname: inputSurname.value,
    };
    localStorage.setItem("InfUser", JSON.stringify(user));

    firtsDiv.remove(); //Elimino los inputs

    const heyTitle = document.createElement("h2"); //Agrego elementos
    heyTitle.innerText =
      "Bienvenido " + user.name + " estas listo para invertir?";
    heyDiv.append(heyTitle);

    //Agregar mas elementos al Dom (Inversiones)
    crearInvDiv();

    const botonCalcular = document.getElementById("botonCalcular");

    botonCalcular.onclick = () => {
      //Obtener informacion del input monto y select riesgo
      const montInv = document.getElementById("inputMont").value;
      const riesgoSelec = document.getElementById("selectRiesgo").value;
      console.log(montInv, riesgoSelec);
      const tasaRiesgoEscogido = riesgos.find(
        (riesgo) => riesgo.tipo === riesgoSelec
      ).tasa;
      console.log(tasaRiesgoEscogido);

      bancos.forEach((banco) => {
        const rendimientoConRiesgo = banco.rendimiento * tasaRiesgoEscogido;
        const utilidad = montInv * rendimientoConRiesgo;
        const parrafoBanco = document.createElement("p");
        parrafoBanco.innerText =
          "El banco " +
          banco.nombre +
          " te ofrece un rendimiento anual de " +
          rendimientoConRiesgo +
          "%" +
          " lo que te generaria unas utilidades de " +
          utilidad;
        divResul.append(parrafoBanco);
      });
    };
  }
};

function crearInvDiv() {
  const inputMont = document.createElement("input"); //Crear elemento input de monto a invertir
  inputMont.setAttribute("type", "number"); //Tengo que darle los atributos al Input
  inputMont.setAttribute("id", "inputMont");

  //Crear un elemento parrafo
  const parrafo = document.createElement("p");
  parrafo.innerText =
    "Coloca el monto a invertir y el tipo de riesgo que quieres asumir";

  //Crear select con riesgos
  const select = document.createElement("select");
  select.setAttribute("id", "selectRiesgo");
  //Crear opciones con riesgo de forma dinamica
  riesgos.forEach((riesgo) => {
    const optionRiesgo = document.createElement("option");
    optionRiesgo.innerText = riesgo.tipo;
    select.append(optionRiesgo);
  });

  //Botton calcular inversion
  const bttonCacl = document.createElement("button");
  bttonCacl.setAttribute("id", "botonCalcular");
  bttonCacl.innerText = "Calcular";

  divInv.append(parrafo, inputMont, select, bttonCacl);
}
