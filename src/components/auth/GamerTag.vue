<template>
  <form style="width: 100%" @submit.prevent="submit">
    <v-layout row wrap v-if="xbox || ps || pc">
      <v-flex md12>
        <v-btn dark @click="enableEdit" icon :color="editBtnColor" title="Click for edit" style="float:right;margin-right:50px;">
          <v-icon>edit</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap text-md-center>
      <v-flex md1 xs3>
        <i class="fab fa-xbox fa-4x"></i>
      </v-flex>
      <v-flex md5 xs9 pr-5>
        <v-text-field
          :disabled="!status.xbox"
          :solo-inverted="!status.xbox"
          v-model="xbox"
          label="XBOX LIVE GAMERTAG"
        ></v-text-field>
      </v-flex>

      <v-flex md1 xs3>
        <i class="fab fa-playstation fa-4x"></i>
      </v-flex>
      <v-flex md5 xs9 pr-5>
        <v-text-field
          :disabled="!status.ps"
          :solo-inverted="!status.ps"
          v-model="ps"
          label="PSN USERNAME"
        ></v-text-field>
      </v-flex>

      <v-flex md1 xs3>
        <i class="fas fa-desktop fa-4x"></i>
      </v-flex>
      <v-flex md5 xs9 pr-5>
        <v-text-field
          :disabled="!status.pc"
          :solo-inverted="!status.pc"
          v-model.lazy="pc"
          label="PC USERNAME"
        ></v-text-field>
      </v-flex>
      <v-flex md12 text-md-left>
        <v-btn :loading="loading" :disabled="loading" @click="submit" color="success" left>{{ $t('buttons.SaveChanges')
          }}
        </v-btn>
      </v-flex>
    </v-layout>
  </form>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        loading: false,
        xbox: '',
        ps: '',
        pc: '',
        gamerTags: [],
        status: {
          xbox: true,
          ps: true,
          pc: true,
        },
        editBtnColor: 'warning',
        isEditing: false
      }
    },
    methods: {
      enableEdit(){
        if(this.status.xbox){
          this.status.xbox = false;
          this.status.ps = false;
          this.status.pc = false;
          this.editBtnColor = 'warning'
          this.isEditing = true;

        }else{
          this.status.xbox = true;
          this.status.ps = true;
          this.status.pc = true;
          this.editBtnColor = 'success'
          this.isEditing = true
        }
        
      },
      submit() {
        let gamerTags = {
          items: [],
          isEditing: this.isEditing
        }

        this.loading = true
        
        if(this.isEditing){
          this.gamerTags.isEditing = true
        }
        if (this.xbox) {
          gamerTags.items.push({platform_id: 1, username: this.xbox})
        }

        if (this.ps) {
          gamerTags.items.push({platform_id: 2, username: this.ps})
        }

        if (this.pc) {
          gamerTags.items.push({platform_id: 3, username: this.pc})
        }
        
        if(!this.isEditing){
          axios.post('/api/me/platform-usernames', gamerTags).then(resp => {
            this.fetchGamerTags().then(() => {
              this.loading = false
            })
          })
        }else{
          axios.patch('/api/me/platform-usernames-changename', gamerTags).then(resp => {
            this.fetchGamerTags().then(() => {
              this.loading = false
            })
          })
        }

        
      },
      fetchGamerTags() {
        return new Promise((resolve, reject) => {
          axios.get('/api/me/platform-usernames').then(resp => {
            this.gamerTags = resp.data
            this.gamerTags.forEach(n => {
              switch (n.platform.slug) {
                case 'xbox-one':
                  this.xbox = n.username
                  this.status.xbox = false
                  break
                case 'playstation-4':
                  this.ps = n.username
                  this.status.ps = false
                  break
                case 'pc':
                  this.pc = n.username
                  this.status.pc = false
                  break
              }
            })

            resolve(resp)
          })
        })
      }
    },
    created() {
      this.fetchGamerTags()
    }
  }
</script>
