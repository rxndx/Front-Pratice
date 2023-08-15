class Student {
    constructor(name, marks) {
        this.name = name;
        this.marks = marks;
    }

    #getMarksSum() {
        return this.marks.reduce((acc, mark) => acc + mark, 0);
    }

    getAverageMark() {
        return this.marks.length === 0 ? 0 : this.#getMarksSum() / this.marks.length;
    }
}

class Group {
    #students = [];

    addStudent(student) {
        if (this.#isStudent(student)) {
            this.#students.push(student);
        }
    }

    #isStudent(student) {
        return student instanceof Student;
    }

    getAverageMark() {
        return this.#students.length === 0 ? 0 : this.#getAverageMarksSum() / this.#students.length;
    }

    #getAverageMarksSum() {
        return this.#students.reduce((acc, student) => acc + student.getAverageMark(), 0);
    }

    get students() {
        return this.#students;
    }
}

const group = new Group();

group.addStudent(new Student('John', [10, 8])); // средний балл = 9
group.addStudent(new Student('Alex', [10, 9])); // средний балл = 9.5
group.addStudent(new Student('Bob', [6, 10])); // средний балл = 8

console.log(group.students.length === 3);
group.addStudent({}); // игнорируем добавление невалидных данных
console.log(group.students.length === 3);

// Выводим средний балл группы
console.log(group.getAverageMark() === (9 + 9.5 + 8) / 3);

group.students = [new Student('John', [10, 10, 5, 10])]; // Сделать group.students - readonly
console.log(group.students.length === 3);