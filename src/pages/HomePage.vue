<template>
  <div>

    <b-container  v-show="this.session">   
      <br>
      <b-alert show variant="danger" v-show="this.$store.state.requestErrorStatus">{{this.$store.state.requestErrorStatus}}</b-alert>   
      <b-row align-h="end" class="search-block">  
        <b-col cols="4" class="text-right">
          <b-input-group>
            <b-form-input placeholder="Найти (ФИО, дата рожд., № докум.)" v-model="searchingValue"/>
            <b-input-group-append>
              <b-btn size="sm" variant="success" >
                <i class="material-icons">search</i>
              </b-btn>
            </b-input-group-append>
          </b-input-group>          
        </b-col> 
      </b-row>
      <b-row align-h="center" class="head-row">
          <b-col cols="4" class="text-center">ФИО</b-col>         
          <b-col cols="2" class="text-center">Дата рождения</b-col>
          <b-col cols="1" class="text-center">Пол</b-col>
          <b-col cols="2" class="text-center">Место жительства</b-col> 
          <b-col cols="3" class="text-right">
            <b-button @click="showModal('add')" size="sm" variant="success" v-b-tooltip.hover.topright title="Добавить пользователя">
              <i class="material-icons">person_add</i>
            </b-button>
          </b-col>                
      </b-row>
      <div  v-for="(person, key) in filteredPersons" :key="key" class="main-row">
        <b-row align-h="center">
          <b-col cols="4" class="text-center">{{person.surname}} {{person.name}} {{person.middlename}}</b-col>          
          <b-col cols="2" class="text-center">{{person.birthdate}}</b-col>
          <b-col cols="1" class="text-center">{{person.sex  === 'm' ? 'муж' : 'жен'}}</b-col>
          <b-col cols="2" class="text-center">{{person.adress}}</b-col> 
          <b-col cols="3" class="text-right">           
            <b-button @click="toggleShowDetail_person(person.id)" size="sm" variant="outline-success" v-b-tooltip.hover.topright title="Подробнее">
              <i class="material-icons">more_horiz</i>
            </b-button>  
            <b-button @click="showModal(person)" size="sm" variant="outline-warning" v-b-tooltip.hover.topright title="Редактировать">
             <i class="material-icons">create</i>
            </b-button>
            <b-button @click="deletePerson(person)" size="sm" variant="outline-danger" v-b-tooltip.hover.topright title="Удалить">
             <i class="material-icons">clear</i>
            </b-button>
          </b-col> 
        </b-row>
        <div v-show="person.detailShow" class="detailInfo-block">  
          <b-row align-h="end" class="add-doc-button-block">
            <b-col cols="2" class="text-right">
              <b-button @click="showModalDoc('add', person.id)" size="sm" variant="success" v-b-tooltip.hover.topright title="Добавить документ">
               <i class="material-icons">note_add</i>
              </b-button>
            </b-col>
          </b-row>
          <b-row align-h="center" v-show="!person.docs.length">Нет информации</b-row>
          <b-row align-h="end" v-show="person.docs.length" class="subhead-row">
            <b-col cols="2" class="text-center">Тип</b-col>
            <b-col cols="2" class="text-center">№</b-col>
            <b-col cols="2" class="text-center">Кем выдан</b-col>
            <b-col cols="2" class="text-center">Дата выдачи</b-col>
            <b-col cols="2" class="text-center">Срок действия</b-col>
            <b-col cols="2"></b-col>            
          </b-row>
          <b-row v-for="(doc, dockey) in person.docs" :key="dockey" align-h="end">            
            <b-col cols="2" class="text-center">{{doc.type}}</b-col>
            <b-col cols="2" class="text-center">{{doc.number}}</b-col>
            <b-col cols="2" class="text-center">{{doc.organization}}</b-col>
            <b-col cols="2" class="text-center">{{doc.issueddate}}</b-col>
            <b-col cols="2" class="text-center">{{doc.expiresdate}}</b-col>
            <b-col cols="2" class="text-right">
              <b-button @click="showModalDoc(doc)" size="sm" variant="outline-warning" v-b-tooltip.hover.topright title="Редактировать">
                <i class="material-icons">create</i>
              </b-button>           
              <b-button @click="deleteDoc(doc)" size="sm" variant="outline-danger" v-b-tooltip.hover.topright title="Удалить">
               <i class="material-icons">clear</i>
              </b-button>
            </b-col>            
          </b-row>
        </div>
      </div>      
    </b-container>

    <b-modal v-model="modalShow" hide-footer @hide="resetModal" :title="modalInfo.title">        
        <b-form-group id="fieldsetSurname"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      description=""
                      label="Фамилия*"
                      label-for="surname">
          <b-form-input id="surname" v-model="modalInfo.content.surname" @input="$v.modalInfo.content.surname.$touch()"  v-bind:class="{ 'input--error': $v.modalInfo.content.surname.$error }"></b-form-input>          
        </b-form-group>      
        <b-form-group id="fieldsetName"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      description=""
                      label="Имя*"
                      label-for="name">
          <b-form-input id="name" v-model="modalInfo.content.name" @input="$v.modalInfo.content.name.$touch()"  v-bind:class="{ 'input--error': $v.modalInfo.content.name.$error }"></b-form-input>
        </b-form-group>      
        <b-form-group id="fieldsetMiddlename"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      description=""
                      label="Отчество*"
                      label-for="middlename">
          <b-form-input id="middlename" v-model="modalInfo.content.middlename" @input="$v.modalInfo.content.middlename.$touch()"  v-bind:class="{ 'input--error': $v.modalInfo.content.middlename.$error }"></b-form-input>
        </b-form-group>     
        <b-form-group id="fieldsetBirthdate"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      description=""
                      label="Дата рождения*"
                      label-for="birthdate">
          <b-form-input id="birthdate" v-model="modalInfo.content.birthdate" @input="$v.modalInfo.content.birthdate.$touch()"  v-bind:class="{ 'input--error': $v.modalInfo.content.birthdate.$error }"></b-form-input>
        </b-form-group>  
        <b-form-group horizontal
                      :label-cols="4" 
                      breakpoint="md"
                      description=""
                      label="Пол:*"   
                      label-for="sex">                  
          <b-form-radio-group id="sex" v-model="modalInfo.content.sex">
            <b-form-radio value="m">муж</b-form-radio>
            <b-form-radio value="f">жен</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <b-form-group id="fieldsetAdress"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      description=""
                      label="Место жительства*"
                      label-for="adress">
          <b-form-input id="adress" v-model="modalInfo.content.adress" @input="$v.modalInfo.content.adress.$touch()"  v-bind:class="{ 'input--error': $v.modalInfo.content.adress.$error }"></b-form-input>          
        </b-form-group>   
        <b-form-group horizontal
                      :label-cols="8"
                      breakpoint="md">
          <b-btn  variant="success" block @click="savePerson(modalInfo.content)" :disabled="$v.modalInfo.$invalid">Сохранить</b-btn>   
        </b-form-group>           
    </b-modal>



    <b-modal v-model="modalShowDoc" hide-footer @hide="resetModalDoc" :title="modalInfoDoc.title">        
        <b-form-group id="fieldsetType"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      description=""
                      label="Тип документа"
                      label-for="type">
          <b-form-radio-group id="type" v-model="modalInfoDoc.content.type">
            <b-form-radio value="passport">Паспорт</b-form-radio>
            <b-form-radio value="identity card">Уд. личности</b-form-radio>
          </b-form-radio-group>
        </b-form-group>      
        <b-form-group id="fieldsetNumber"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      description=""
                      label="Номер*"
                      label-for="number">
          <b-form-input id="number" v-model="modalInfoDoc.content.number" @input="$v.modalInfoDoc.content.number.$touch()"  v-bind:class="{ 'input--error': $v.modalInfoDoc.content.number.$error }"></b-form-input>
        </b-form-group>      
        <b-form-group id="fieldsetOrganization"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      description=""
                      label="Кем выдан*"
                      label-for="organization">
          <b-form-input id="organization" v-model="modalInfoDoc.content.organization" @input="$v.modalInfoDoc.content.organization.$touch()"  v-bind:class="{ 'input--error': $v.modalInfoDoc.content.organization.$error }"></b-form-input>
        </b-form-group>     
        <b-form-group id="fieldsetIssueddate"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      description=""
                      label="Дата выдачи*"
                      label-for="issueddate">
          <b-form-input id="birthissueddatedate" v-model="modalInfoDoc.content.issueddate" @input="$v.modalInfoDoc.content.issueddate.$touch()"  v-bind:class="{ 'input--error': $v.modalInfoDoc.content.issueddate.$error }"></b-form-input>
        </b-form-group>          
        <b-form-group id="fieldsetExpiresdate"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      description=""
                      label="Срок действия*"
                      label-for="expiresdate">
          <b-form-input id="expiresdate" v-model="modalInfoDoc.content.expiresdate" @input="$v.modalInfoDoc.content.expiresdate.$touch()"  v-bind:class="{ 'input--error': $v.modalInfoDoc.content.expiresdate.$error }"></b-form-input>          
        </b-form-group>
        <b-form-group horizontal
                      :label-cols="8"
                      breakpoint="md">
          <b-btn  variant="success" block @click="saveDoc(modalInfoDoc.content)" :disabled="$v.modalInfoDoc.$invalid">Сохранить</b-btn>   
        </b-form-group>   
    </b-modal>

  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { required } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        modalShow: false,
        modalShowDoc: false,
        modalInfo: { title: 'Добавить пользователя', content: {sex: 'm'} },
        modalInfoDoc: { title: 'Добавить документ', content: {type: 'passport'} },
        personEditing: false,
        docEditing: false,
        searchingValue: ''
      }
    },
    validations: {
      modalInfo: {
        content: {
          surname: { required },
          name: { required },
          middlename: { required },
          birthdate: { required },
          adress: { required }
        }
      },
      modalInfoDoc: {
        content: {
          number: { required },
          organization: { required },
          issueddate: { required },
          expiresdate: { required }
        }
      }
    },
    mounted () {
      this.getAllPersons()
      this.checkAuthStatus()
    },
    computed: {
      ...mapGetters([
        'allPersons',
        'session'
      ]),
      filteredPersons () {
        return this.allPersons.filter(person => person.surname.toLowerCase().indexOf(this.searchingValue.toLowerCase()) >= 0 ||
                                                person.name.toLowerCase().indexOf(this.searchingValue.toLowerCase()) >= 0 ||
                                                person.middlename.toLowerCase().indexOf(this.searchingValue.toLowerCase()) >= 0 ||
                                                person.birthdate.indexOf(this.searchingValue) >= 0 ||
                                                person.docs.some(doc => doc.number.indexOf(this.searchingValue) >= 0))
      }
    },
    methods: {
      ...mapActions([
        'getAllPersons',
        'deletePerson',
        'editPerson',
        'addPerson',
        'deleteDoc',
        'editDoc',
        'addDoc'
      ]),
      ...mapMutations([
        'toggleShowDetail_person'
      ]),
      resetModal () {
        this.modalInfo.title = 'Добавить пользователя'
        this.modalInfo.content = {sex: 'm'}
      },
      resetModalDoc (personID) {
        this.modalInfoDoc.title = 'Добавить документ'
        this.modalInfoDoc.content = {type: 'passport', personid: personID}
      },
      showModal (person) {
        if (person === 'add') {
          this.personEditing = false
          this.resetModal()
        } else {
          this.personEditing = true
          this.modalInfo.title = 'Редактировать пользователя'
          this.modalInfo.content = {...person}
        }
        this.modalShow = !this.modalShow
      },
      savePerson (person) {
        if (this.personEditing === false) {
          this.addPerson(person)
        } else {
          this.editPerson(person)
        }
        this.modalShow = !this.modalShow
        this.resetModal
      },
      showModalDoc (doc, personID) {
        if (doc === 'add') {
          this.docEditing = false
          this.resetModalDoc(personID)
        } else {
          this.docEditing = true
          this.modalInfoDoc.title = 'Редактировать документ'
          this.modalInfoDoc.content = {...doc}
        }
        this.modalShowDoc = !this.modalShowDoc
      },
      saveDoc (doc) {
        if (this.docEditing === false) {
          this.addDoc(doc)
        } else {
          this.editDoc(doc)
        }
        this.modalShowDoc = !this.modalShowDoc
        this.resetModalDoc
      },
      checkAuthStatus () {
        if (this.session === '') {
          window.location.replace('/#/login')
        }
      }
    }
  }
</script>

<style>
.btn {
  line-height: 1!important;
}
.head-row {
  font-weight:  bold;
  padding: 10px 0;
  background-color: #e2e3e5;
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
}
.subhead-row {
  font-weight:  bold;
}
.main-row {
  padding-bottom: 20px;
  padding-top: 20px;
  border-bottom: 2px solid #cccccc;
}
.add-doc-button-block {
  padding-top: 10px;
}
.detailInfo-block {
  font-size: 85%;
  padding-left: 20px;
  padding-top: 10px;
}
.detailInfo-block .material-icons {
  font-size: 12px;  
}
.add-doc-button-block .material-icons {
  font-size: 24px;
}
.detailInfo-block .row {
  padding: 5px 0;  
}
.search-block {
  margin: 30px 0;
}
.input--error {
  border-color: red!important;
}
</style>
