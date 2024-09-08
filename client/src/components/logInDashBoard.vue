<template>
    <section id="logInWindow">
        <div id="logInImg">

        </div>
        <div id="logInDashBoard">
            <div id="formDiv">
                <h1>LiveChat Log in</h1>
                <form action="" method="dialog" @submit="SendNewDataAccount()">
                    <nav>
                        <div>
                            <label for="">full Name</label><br>
                            <input type="text" minlength="3" v-model="newAccountData.newName" required>
                        </div>
                        <div>
                            <label for="">Username</label><br>
                            <input type="text" minlength="5" v-model="newAccountData.newUsername" required>
                        </div>
                    </nav>
                    <label for="">Email</label><br>
                    <input id="newAccountEmail" type="email" placeholder="Examole@Gmail.com"
                        v-model="newAccountData.newEmail" required><br>
                    <label for="">Password</label><br>
                    <input id="newAccountPassword" type="password" minlength="8" v-model="newAccountData.newPassword"
                        required><br>
                    <nav>
                        <div>
                            <label for="">Phone number</label><br>
                            <input type="tel" placeholder="+963********" v-model="newAccountData.newPhone" required><br>
                        </div>
                        <div>
                            <label for="">your location</label><br>
                            <input type="text" v-model="newAccountData.newLocation" required>
                        </div>
                    </nav>
                    <input id="submitNewAccount" class="submitButton" type="submit" value="Create Account">
                    <p id="haveAccount">alredy a member ? <router-link to="/signin">sign in</router-link></p>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "logInDashBoard",
    data: function () {
        return {
            newAccountData: {
                newName: '',
                newUsername: '',
                newEmail: '',
                newPassword: '',
                newPhone: '',
                newLocation: '',
                role: 'Student'
            }
        }
    },
    mounted(){
        this.checkAuthentication()
    },
    methods: {
        SendNewDataAccount: function () {
            fetch('http://localhost:8081/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.newAccountData)
            })
                .then((response) => {
                    return response.json()
                })
                .then((response) => {
                    if (response) {
                        this.$router.push({ name: 'signin' })
                    }
                })
            this.newAccountData.newName = ''
            this.newAccountData.newUsername = ''
            this.newAccountData.newPassword = ''
            this.newAccountData.newEmail = ''
            this.newAccountData.newPhone = ''
            this.newAccountData.newLocation = ''
        },
        checkAuthentication() {
            if (localStorage.role != undefined) {
                this.$router.push({ path: `/${localStorage.role}` })
            }
        }
    }
}
</script>