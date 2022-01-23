let students = [
    { name: 'Maргарита', surname: 'Дайницына', middlename: 'Владимировна', birthdate: new Date('1993-11-28'), yearStart: '2019', faculty: 'ИФН' },
    { name: 'Иван', surname: 'Иванов', middlename: 'Иванович', birthdate: new Date('1996-03-08'), yearStart: '2012', faculty: 'ИЭиУ' },
];

let sorteredStudents = [];
Object.assign(sorteredStudents, students);

// ФОРМА ДОБАВЛЕНИЯ
function createFormForNewStudent() {
    const form = document.createElement('form');
    const inputName = document.createElement('input');
    const inputSurame = document.createElement('input');
    const inputMiddlename = document.createElement('input');
    const inputBirthdate = document.createElement('input');
    const inputYearOfStart = document.createElement('input');
    const inputFaculty = document.createElement('input');
    const buttonAdd = document.createElement('button');

    inputName.classList.add('col-4', 'mb-1');
    inputSurame.classList.add('col-4', 'mb-1');
    inputMiddlename.classList.add('col-4', 'mb-1');
    inputBirthdate.classList.add('col-4', 'mb-1');
    inputYearOfStart.classList.add('col-4', 'mb-1');
    inputFaculty.classList.add('col-4', 'mb-1');
    inputName.placeholder = 'Имя';
    inputSurame.placeholder = 'Фамилия';
    inputMiddlename.placeholder = 'Отчество';
    inputBirthdate.placeholder = 'Дата рождения';
    inputYearOfStart.placeholder = 'Год начала обучения';
    inputFaculty.placeholder = 'Факультет';
    inputBirthdate.type = 'date';
    inputYearOfStart.type = "number";

    buttonAdd.classList.add('btn', 'btn-primary');
    buttonAdd.textContent = 'Добавить студента';

    form.append(inputName);
    form.append(inputSurame);
    form.append(inputMiddlename);
    form.append(inputBirthdate);
    form.append(inputYearOfStart);
    form.append(inputFaculty);
    form.append(buttonAdd);

    document.querySelector('.forms').append(form);

    return {
        form, inputName, inputSurame, inputMiddlename, inputBirthdate, inputYearOfStart, inputFaculty, buttonAdd,
    };
}


// ФИЛЬТР ПО ТАБЛИЦЕ
function createFormForFilter() {
    const formFilter = document.createElement('form');
    const inputNameFilter = document.createElement('input');
    const inputFacultyFilter = document.createElement('input');
    const inputYearOfStartFilter = document.createElement('input');
    const inputYearOfEndFilter = document.createElement('input');

    inputNameFilter.classList.add('col-3', 'name-filter');
    inputFacultyFilter.classList.add('col-3', 'faculty-filter');
    inputYearOfStartFilter.classList.add('col-3', 'start-filter');
    inputYearOfEndFilter.classList.add('col-3', 'end-filter');

    inputNameFilter.placeholder = 'ФИО Студента';
    inputFacultyFilter.placeholder = 'Факультет';
    inputYearOfStartFilter.placeholder = 'Год начала обучения';
    inputYearOfEndFilter.placeholder = 'Год окончания обучения';
    inputYearOfStartFilter.type = "number";
    inputYearOfEndFilter.type = "number";

    formFilter.append(inputNameFilter);
    formFilter.append(inputFacultyFilter);
    formFilter.append(inputYearOfStartFilter);
    formFilter.append(inputYearOfEndFilter);

    document.querySelector('.filter').append(formFilter);

    return {
        inputNameFilter, inputFacultyFilter, inputYearOfStartFilter, inputYearOfEndFilter
    };
}


//  ЗАГОЛОВОК ТАБЛИЦЫ
function createHeadTable() {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    const tdHead1 = document.createElement('td');
    const tdHead2 = document.createElement('td');
    const tdHead3 = document.createElement('td');
    const tdHead4 = document.createElement('td');

    table.classList.add('table', 'table-bordered');
    trHead.classList.add('table-warning');
    trHead.style.cursor = 'pointer';

    tdHead1.textContent = 'ФИО Студента';
    tdHead2.textContent = 'Факультет';
    tdHead3.textContent = 'Дата рождения и возраст';
    tdHead4.textContent = 'Годы обучения и курс';

    tdHead1.classList.add('td-head');
    tdHead2.classList.add('td-head');
    tdHead3.classList.add('td-head');
    tdHead4.classList.add('td-head');

    table.append(thead);
    thead.append(trHead);
    trHead.append(tdHead1);
    trHead.append(tdHead2);
    trHead.append(tdHead3);
    trHead.append(tdHead4);

    document.querySelector('.table').append(table);

    return {
        tdHead1, tdHead2, tdHead3, tdHead4
    };
}

//  ТЕЛО ТАБЛИЦЫ
function createBodyTable(array) {
    if (document.querySelector('tbody') !== null) {
        document.querySelector('tbody').remove()
    }

    const tbody = document.createElement('tbody');

    for (person of array) {
        const trBody = document.createElement('tr');
        const thBody1 = document.createElement('td');
        const thBody2 = document.createElement('td');
        const thBody3 = document.createElement('td');
        const thBody4 = document.createElement('td');
        tbody.append(trBody);
        trBody.append(thBody1);
        trBody.append(thBody2);
        trBody.append(thBody3);
        trBody.append(thBody4);

        thBody1.textContent = `${person.surname} ${person.name} ${person.middlename}`;
        thBody2.textContent = person.faculty;

        let now = new Date();
        let born = new Date(person.birthdate);
        let age = Math.floor((now.getTime() - born.getTime()) / 1000 / 60 / 60 / 24 / 365.25);
        thBody3.textContent = `${born.getDate()}.${born.getMonth() + 1}.${born.getFullYear()} (${age} лет)`;

        let datetart = new Date(person.yearStart);
        let dateEnd = Number(person.yearStart) + 4;
        let course = Math.floor((now.getTime() - datetart.getTime()) / 1000 / 60 / 60 / 24 / 365.25);
        if (course > 4) {
            thBody4.textContent = `${person.yearStart}-${dateEnd} (Закончил(а))`;
        } else {
            thBody4.textContent = `${person.yearStart}-${dateEnd} (${course} курс)`;
        }
    }
    document.querySelector('.table-bordered').append(tbody);

    return tbody;
}


// МАССИВ СТУДЕНТОВ
function arrayOfStidents() {

    let newStudentForm = createFormForNewStudent();

    newStudentForm.form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (document.getElementById('error') !== null) {
            document.getElementById('error').remove()
        };

        if ((newStudentForm.inputName.value.trim() === '') || (newStudentForm.inputSurame.value.trim() === '') || (newStudentForm.inputMiddlename.value.trim() === '') || (newStudentForm.inputBirthdate.value.trim() === '') || (newStudentForm.inputYearOfStart.value.trim() === '') || (newStudentForm.inputFaculty.value.trim() === '')) {
            let error = document.createElement('p');
            error.id = 'error';
            error.textContent = 'Все поля должны быть заполнены';
            newStudentForm.buttonAdd.before(error);
        }
        else if (newStudentForm.inputBirthdate.valueAsDate < (new Date('01.01.1900')) || (newStudentForm.inputBirthdate.valueAsDate > (new Date()))) {
            let error = document.createElement('p');
            error.id = 'error';
            error.textContent = 'Укажите дату рождения в диапазоне от 01.01.1900 до текущей даты';
            newStudentForm.buttonAdd.before(error);
        }
        else if ((newStudentForm.inputYearOfStart.value < 2000) || (newStudentForm.inputYearOfStart.value > (new Date().getFullYear()))) {
            let error = document.createElement('p');
            error.id = 'error';
            error.textContent = 'Укажите год начала обучения в диапазоне от 2000-го до текущего года';
            newStudentForm.buttonAdd.before(error);
        }
        else {
            let person = {};

            person.name = newStudentForm.inputName.value;
            person.surname = newStudentForm.inputSurame.value;
            person.middlename = newStudentForm.inputMiddlename.value;
            person.birthdate = newStudentForm.inputBirthdate.valueAsDate;
            person.yearStart = newStudentForm.inputYearOfStart.value;
            person.faculty = newStudentForm.inputFaculty.value;
            students.push(person);

            Object.assign(sorteredStudents, students);

            createBodyTable(students);

            newStudentForm.inputName.value = '';
            newStudentForm.inputSurame.value = '';
            newStudentForm.inputMiddlename.value = '';
            newStudentForm.inputBirthdate.value = '';
            newStudentForm.inputYearOfStart.value = '';
            newStudentForm.inputFaculty.value = '';
        };
    });
}


//СОРТИРОВКА и ФИЛЬТРАЦИЯ
function filterAndSorter() {

    let headTable = Array.from(document.querySelectorAll('.td-head'));

    headTable[0].addEventListener('click', () => {
        console.log('click1');
        sorteredStudents.sort(function (a, b) {
            let fullNameA=`${a.surname} ${a.name} ${a.middlename}`;
            let fullNameB=`${b.surname} ${b.name} ${b.middlename}`;
            if (fullNameA > fullNameB) {
                return 1;
            }
            if (fullNameA < fullNameB) {
                return -1;
            }
            return 0;
        });
        createBodyTable(sorteredStudents);
    });
    headTable[1].addEventListener('click', () => {
        console.log('click2');
        sorteredStudents.sort(function (a, b) {
            if (a.faculty > b.faculty) {
                return 1;
            }
            if (a.faculty < b.faculty) {
                return -1;
            }
            return 0;
        });
        createBodyTable(sorteredStudents);
    });
    headTable[2].addEventListener('click', () => {
        console.log('click3');
        sorteredStudents.sort((a, b) => (new Date(a.birthdate) - new Date(b.birthdate)));
        createBodyTable(sorteredStudents);
    });
    headTable[3].addEventListener('click', () => {
        console.log('click4');
        sorteredStudents.sort((a, b) => (a.yearStart - b.yearStart));
        createBodyTable(sorteredStudents);
    });

    const nameFilter = document.querySelector('.name-filter');
    const facultyFilter = document.querySelector('.faculty-filter');
    const startFilter = document.querySelector('.start-filter');
    const endFilter = document.querySelector('.end-filter');

    function filter() {
        let sorteredStudents = [];
        Object.assign(sorteredStudents, students);
        if (nameFilter.value.trim())
        sorteredStudents = sorteredStudents.filter(sorteredStudents => `${sorteredStudents.surname} ${sorteredStudents.name} ${sorteredStudents.middlename}`.includes(nameFilter.value));
        if (facultyFilter.value.trim())
        sorteredStudents = sorteredStudents.filter(sorteredStudents => sorteredStudents.faculty.includes(facultyFilter.value));
        if (startFilter.value.trim())
        sorteredStudents = sorteredStudents.filter(sorteredStudents => sorteredStudents.yearStart === startFilter.value);
        if (endFilter.value.trim())
            sorteredStudents = sorteredStudents.filter(sorteredStudents => (String(Number(sorteredStudents.yearStart) + 4))  === endFilter.value);
        createBodyTable(sorteredStudents)
    }

    nameFilter.addEventListener('input', filter);
    facultyFilter.addEventListener('input', filter);
    startFilter.addEventListener('input', filter);
    endFilter.addEventListener('input', filter);

    return sorteredStudents;

}

document.addEventListener('DOMContentLoaded', () => {
    arrayOfStidents();
    createFormForFilter();
    createHeadTable();
    createBodyTable(filterAndSorter());
})
