import axios from "axios";
import { uniqueNamesGenerator, names } from "unique-names-generator";

const url =
  "https://protected-gorge-58917-c78711b4456a.herokuapp.com/https://data.mongodb-api.com/app/data-urews/endpoint/data/v1/action";
//TODO: CHANGE URL
// const url =  "https://cors-anywhere.herokuapp.com/https://data.mongodb-api.com/app/data-urews/endpoint/data/v1/action";

const headers = {
  headers: {
    "api-key": import.meta.env.VITE_MONGO_API_KEY,
    "x-requested-with": "axios-web",
  },
};

const defultBody = () => {
  return {
    database: "main",
    dataSource: "bovino-tracker",
  };
};

export const findUser = async (userEmail, userPassword) => {
  const userURL = `${url}/findOne`;
  const filter = {
    email: userEmail,
    password: String(userPassword),
  };
  let findBody = defultBody();
  findBody.filter = filter;
  findBody.collection = "users";

  let result = await axios.post(userURL, findBody, headers);

  return result.data.document;
};

export const findAnimalsAsync = async (farmName) => {
  const findAnimalURL = `${url}/find`;
  const filter = {
    farm_name: farmName,
  };
  let findBody = defultBody();
  findBody.filter = filter;
  findBody.collection = "animals";

  let response = await axios.post(findAnimalURL, findBody, headers);

  return response.data.documents;
};

export const findAnimals = (farmName) => {
  const findAnimalURL = `${url}/find`;
  const filter = {
    farm_name: farmName,
  };
  let findBody = defultBody();
  findBody.filter = filter;
  findBody.collection = "animals";

  let animals = [];

  axios.post(findAnimalURL, findBody, headers).then((result) => {
    result.data.documents.map((animal) => {
      animals.push(handleAnimal(animal));
    });
  });

  return animals;
};

const handleAnimal = (animal) => {
  let updated = false;

  if (animal.name == null) {
    animal.name = uniqueNamesGenerator({
      dictionaries: [names],
    });
    updated = true;
  }

  if (animal.age == null) {
    animal.age = Math.floor(Math.random() * (22 - 2 + 1) + 2);
    updated = true;
  }

  if (animal.breed == null) {
    var breeds = [
      "Nelore",
      "Angus",
      "Brahman",
      "Brangus",
      "Senepol",
      "Hereford",
    ];
    animal.breed = breeds[Math.floor(Math.random() * breeds.length)];
    updated = true;
  }

  if (updated) {
    updateAnimal(animal);
  }

  return animal;
};

export const updateAnimal = (animal) => {
  const updateAnimalURL = `${url}/updateOne`;
  delete animal._id;
  const filter = {
    animal_serial: animal.animal_serial,
  };
  const update = {
    $set: animal,
  };

  let updateBody = defultBody();
  updateBody.collection = "animals";
  updateBody.filter = filter;
  updateBody.update = update;

  axios.post(updateAnimalURL, updateBody, headers).then((result) => {
    console.log(`animal ${animal.animal_serial} successfully updated`);
  });
};

export const findActiveAdhesions = () => {
  const findHubUrl = `${url}/find`;
  const filter = {
    active: true,
  };
  let findBody = defultBody();
  findBody.filter = filter;

  let adhesions = [];

  axios.post(findHubUrl, findBody, headers).then((result) => {
    result.data.documents.map((adhesion) => {
      adhesions.push(adhesion);
    });
  });

  return adhesions;
};

export const findAdhesionsByHub = async () => {
  const findHubUrl = `${url}/find`;
  const filter = {
    active: true,
  };
  let findBody = defultBody();
  findBody.filter = filter;

  let result = await axios.post(findHubUrl, findBody, headers);
  let adhesions = result.data.documents;

  let adhesionsByHub = adhesions.reduce((iA, cA) => {
    (iA[cA.hub] = iA[cA.hub] || []).push(cA.port);
    return iA;
  }, {});

  console.log(result);
  console.log(adhesionsByHub);
  return adhesionsByHub;
};

export const createAdhesion = (adhesion) => {
  const createAdhesionUrl = `${url}/insertOne`;
  let createBody = defultBody();
  createBody.document = adhesion;

  console.log(createBody);

  axios.post(createAdhesionUrl, createBody, headers).then((result) => {
    console.log(`adhesion ${result.data.insertedId} successfully created`);
  });
};

export const updateAdhesion = (hubId) => {
  const updateAdhesionUrl = `${url}/updateOne`;
  const filter = {
    hub: hubId,
    active: true,
  };
  const update = {
    $set: { active: false },
  };

  let updateBody = defultBody();
  updateBody.filter = filter;
  updateBody.update = update;

  axios.post(updateAdhesionUrl, updateBody, headers).then((result) => {
    console.log(`hub ${hubId} successfully updated`);
  });
};

export const Adhesion = class {
  constructor(hubID, owner, port, consumed, totalKwh, active) {
    this.hub = hubID;
    this.owner = owner;
    this.port = port;
    this.consumed = consumed;
    this.total_kwh = totalKwh;
    this.active = active;
    this.created_at = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
  }

  static from(json) {
    return Object.assign(new AdhesionStatus(), json);
  }
};
