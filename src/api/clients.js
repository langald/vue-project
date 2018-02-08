const _persones = [
  {'id': 'p_1',
    'surname': 'Фомин',
    'name': 'Константин',
    'middlename': 'Константинович',
    'birthdate': '01.01.1985',
    'sex': 'm',
    'adress': 'г Алматы, ул. Аскарова, 62',
    'docs': [
      {'id': 'd_1',
        'type': 'passport',
        'number': '0123456789',
        'organization': 'Мин Юст',
        'issueddate': '04.06.2014',
        'expiresdate': '05.06.2024',
        'personid': 'p_1'
      },
      {'id': 'd_2',
        'type': 'identity card',
        'number': '1234567890',
        'organization': 'Мин Юст',
        'issueddate': '04.06.2014',
        'expiresdate': '05.06.2024',
        'personid': 'p_1'
      }
    ]
  },
  {'id': 'p_2',
    'surname': 'Комиссарова',
    'name': 'Екатерина',
    'middlename': 'Андреевна',
    'birthdate': '01.01.1988',
    'sex': 'f',
    'adress': 'г Алматы, ул. Аскарова, 5',
    'docs': [
      {'id': 'd_3',
        'type': 'passport',
        'number': '2345678901',
        'organization': 'Мин Юст',
        'issueddate': '04.06.2014',
        'expiresdate': '05.06.2024',
        'personid': 'p_2'
      },
      {'id': 'd_4',
        'type': 'identity card',
        'number': '3456789012',
        'organization': 'Мин Юст',
        'issueddate': '04.06.2014',
        'expiresdate': '05.06.2024',
        'personid': 'p_2'
      }
    ]
  }
]

export default {
  getPersons (cb) {
    setTimeout(() => cb(_persones), 100)
  },

  addPerson (person, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  },
  editPerson (person, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  },
  deletePerson (person, cb, errorCb) {
    setTimeout(() => {
      // simulate random  failure.
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  },

  addDoc (doc, cb, errorCb) {
    setTimeout(() => {
      // simulate random  failure.
      (Math.random() > 0 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  },
  editDoc (doc, cb, errorCb) {
    setTimeout(() => {
      // simulate random failure.
      (Math.random() > 0 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  },
  deleteDoc (doc, cb, errorCb) {
    setTimeout(() => {
      // simulate random failure.
      (Math.random() > 0 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  }
}
