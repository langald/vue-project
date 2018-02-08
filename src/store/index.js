import Vuex from 'vuex'
import Vue from 'vue'
import clients from '@/api/clients'

Vue.use(Vuex)

const state = {
  persons: [],
  session: window.localStorage.getItem('session') || '',
  autherror: '',
  requestErrorStatus: ''
}

const getters = {
  allPersons (state) {
    return state.persons
  },
  session (state) {
    return state.session
  }
}

const mutations = {
  recieve_persons (state, persons) {
    state.persons = persons.map(({ ...person }) => {
      return {
        ...person,
        detailShow: false
      }
    })
  },
  add_person (state, person) {
    state.persons.push({...person, id: 'p_' + Date.now(), docs: [], detailShow: false})
  },
  delete_person (state, person) {
    state.persons.splice(state.persons.indexOf(person), 1)
  },
  edit_person (state, person) {
    state.persons.find(p => p.id === person.id).name = person.name
    state.persons.find(p => p.id === person.id).surname = person.surname
    state.persons.find(p => p.id === person.id).middlename = person.middlename
    state.persons.find(p => p.id === person.id).birthdate = person.birthdate
    state.persons.find(p => p.id === person.id).sex = person.sex
    state.persons.find(p => p.id === person.id).adress = person.adress
  },
  add_doc (state, doc) {
    state.persons.find(p => p.id === doc.personid).docs.push({...doc, id: 'd_' + Date.now()})
  },
  delete_doc (state, doc) {
    let docs = state.persons.find(p => p.id === doc.personid).docs
    docs.splice(docs.indexOf(doc), 1)
  },
  edit_doc (state, doc) {
    state.persons.find(p => p.id === doc.personid).docs.find(d => d.id === doc.id).type = doc.type
    state.persons.find(p => p.id === doc.personid).docs.find(d => d.id === doc.id).number = doc.number
    state.persons.find(p => p.id === doc.personid).docs.find(d => d.id === doc.id).organization = doc.organization
    state.persons.find(p => p.id === doc.personid).docs.find(d => d.id === doc.id).issueddate = doc.issueddate
    state.persons.find(p => p.id === doc.personid).docs.find(d => d.id === doc.id).expiresdate = doc.expiresdate
  },
  toggleShowDetail_person (state, personId) {
    state.persons.find(p => p.id === personId).detailShow = !state.persons.find(p => p.id === personId).detailShow
  },
  set_session (state, auth) {
    if (auth.login === 'user' && auth.password === '123') {
      state.session = 'session1234567890'
      window.localStorage.setItem('session', 'session1234567890')
      window.location.replace('/#/')
      state.autherror = ''
    } else if (typeof (auth.login) === 'undefined' && typeof (auth.password) === 'undefined') {
      state.session = ''
      window.localStorage.setItem('session', '')
      state.autherror = ''
    } else {
      state.session = ''
      window.localStorage.setItem('session', '')
      state.autherror = true
    }
  },
  setRequestStatus (state, requestErrorStatus) {
    state.requestErrorStatus = requestErrorStatus
  }
}

const actions = {
  getAllPersons ({commit}) {
    clients.getPersons(persons => {
      commit('recieve_persons', persons)
    })
  },
  deletePerson ({commit, state}, person) {
    const savedPersons = [...state.persons]
    commit('setRequestStatus', '')
    commit('delete_person', person)
    clients.deletePerson(
      person,
      () => commit('setRequestStatus', ''),
      () => {
        commit('setRequestStatus', 'Ошибка при удалении клиента. Попробуйте снова.')
        // rollback to the persons saved before sending the request
        commit('recieve_persons', savedPersons)
      }
    )
  },
  editPerson ({commit, state}, person) {
    commit('setRequestStatus', '')
    clients.editPerson(
      person,
      () => {
        commit('edit_person', person)
        commit('setRequestStatus', '')
      },
      () => {
        commit('setRequestStatus', 'Ошибка при редактировании клиента. Попробуйте снова.')
      }
    )
  },
  addPerson ({commit, state}, person) {
    commit('setRequestStatus', '')
    clients.addPerson(
      person,
      () => {
        commit('add_person', person)
        commit('setRequestStatus', '')
      },
      () => {
        commit('setRequestStatus', 'Ошибка при добавлении клиента. Попробуйте снова.')
      }
    )
  },
  addDoc ({commit, state}, doc) {
    commit('setRequestStatus', '')
    clients.addDoc(
      doc,
      () => {
        commit('add_doc', doc)
        commit('setRequestStatus', '')
      },
      () => {
        commit('setRequestStatus', 'Ошибка при добавлении документа. Попробуйте снова.')
      }
    )
  },
  editDoc ({commit, state}, doc) {
    commit('setRequestStatus', '')
    clients.editDoc(
      doc,
      () => {
        commit('edit_doc', doc)
        commit('setRequestStatus', '')
      },
      () => {
        commit('setRequestStatus', 'Ошибка при редактировании документа. Попробуйте снова.')
      }
    )
  },
  deleteDoc ({commit, state}, doc) {
    commit('setRequestStatus', '')
    clients.deleteDoc(
      doc,
      () => {
        commit('delete_doc', doc)
        commit('setRequestStatus', '')
      },
      () => {
        commit('setRequestStatus', 'Ошибка при удалении документа. Попробуйте снова.')
      }
    )
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
