/* У цьому завдання вам належить реалізувати сценарій життя, де людина, ключ і будинок взаємодіють один з одним.

Ключ (Key): Створіть клас Key. У нього має бути одна приватна властивість signature, яка генерується випадково при створенні об'єкта цього класу (наприклад Math.random()). Також цей клас повинен мати метод getSignature, який повертає значення властивості signature.

Людина (Person): Створіть клас Person. Конструктор цього класу приймає об'єкт класу Key і зберігає їх у приватному властивості key. Клас Person повинен мати метод getKey, який повертає збережений ключ.

Дім (House): Створіть абстрактний клас House. Цей клас має дві властивості: door, яка може бути відкрита (true), або закрита (false), і key, яка зберігає об'єкт класу Key. У цьому класі також повинен бути метод comeIn, який додає об'єкт класу Person у масив tenants, якщо door відкрита. Ваш абстрактний клас House також повинен мати абстрактний метод OpenDoor, який приймає об'єкт класу Key.

Мій будинок (MyHouse): Створіть клас MyHouse, який успадковується від абстрактного класу House. Реалізуйте метод openDoor у цьому класі. Якщо ключ, переданий цьому методу, збігається з ключем, збереженим як key, то двері відчиняються.

Після реалізації всіх класів створіть об'єкти для кожного класу та спробуйте відтворити сценарій, в якому людина приходить додому.

Наприклад, ось так: */
class Key {
  private signature: number = Math.random();

  getSignature() {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  getKey() {
    return this.key.getSignature();
  }
}

abstract class House {
  private door: boolean;
  protected tenants: Person[] = [];

  constructor(door: boolean, key: Key) {
    this.door = door;
    const person = new Person(key);
    this.tenants.push(person);
  }

  comeIn(person: Person): void {
    if (this.door === true) {
      console.log('Tenant entered the house.');
      this.tenants.push(person);
    } else {
      console.log('The door is closed. Cannot enter.');
    }
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  constructor(door: boolean, key: Key) {
    super(door, key);
  }

  openDoor(key: Key): void {
    if (key.getSignature() === this.tenants[0].getKey()) {
      this.comeIn(this.tenants[0]);
    } else {
      console.log('Invalid key. Cannot open the door.');
    }
  }
}

const key = new Key();
const house = new MyHouse(true, key);
const person = new Person(key);

house.openDoor(key);

export {};
