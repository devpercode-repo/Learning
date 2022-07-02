<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Chat</h1>
        </div>
        <!-- /.col -->
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="/home">Home</a></li>
            <li class="breadcrumb-item"><a href="/console">Console</a></li>
            <li class="breadcrumb-item active">Chat</li>
          </ol>
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->

  <!-- Main content -->
  <div class="content">
    <div class="container-fluid">
      <!-- DIRECT CHAT -->
      <div class="card direct-chat direct-chat-primary">
        <div class="card-header">
          <h3 class="card-title">Chanel 101</h3>

          <div class="card-tools">
            <button type="button" class="btn btn-tool" title="Contacts" data-widget="chat-pane-toggle">
              <i class="fas fa-users"></i>
            </button>
            <span title="3 New Messages" class="badge badge-primary">3</span>
            <button type="button" class="btn btn-tool" data-card-widget="collapse">
              <i class="fas fa-minus"></i>
            </button>
          </div>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <!-- Conversations are loaded here -->
          <div v-for="message in messages" :todo="message" :key="message.created_at" class="direct-chat-messages">
            <!-- Message. Default to the left -->
            <div class="direct-chat-msg" :class="user.id === message.user.id ? 'right' : ''">
              <div class="direct-chat-infos clearfix">
                <span class="direct-chat-name float-left">{{ message.user.name }}</span>
                <span class="direct-chat-timestamp float-right">{{ formatDate(message.created_at) }}</span>
              </div>
              <!-- /.direct-chat-infos -->
              <img class="direct-chat-img" src="@/scripts/assets/img/avatar/Author-Clyde-Webflow.png" alt="message user image" />
              <!-- /.direct-chat-img -->
              <div class="direct-chat-text">
                {{ message.message }}
              </div>
              <!-- /.direct-chat-text -->
            </div>
            <!-- /.direct-chat-msg -->
          </div>
          <!--/.direct-chat-messages-->

          <!-- Contacts are loaded here -->
          <div class="direct-chat-contacts">
            <ul class="contacts-list">
              <li>
                <a href="#">
                  <img class="contacts-list-img" src="@/scripts/assets/img/logo.svg" alt="User Avatar" />

                  <div class="contacts-list-info">
                    <span class="contacts-list-name">
                      Count Dracula
                      <small class="contacts-list-date float-right">2/28/2015</small>
                    </span>
                    <span class="contacts-list-msg">How have you been? I was...</span>
                  </div>
                  <!-- /.contacts-list-info -->
                </a>
              </li>
              <!-- End Contact Item -->
              <li>
                <a href="#">
                  <img class="contacts-list-img" src="@/scripts/assets/img/logo.svg" alt="User Avatar" />

                  <div class="contacts-list-info">
                    <span class="contacts-list-name">
                      Sarah Doe
                      <small class="contacts-list-date float-right">2/23/2015</small>
                    </span>
                    <span class="contacts-list-msg">I will be waiting for...</span>
                  </div>
                  <!-- /.contacts-list-info -->
                </a>
              </li>
              <!-- End Contact Item -->
              <li>
                <a href="#">
                  <img class="contacts-list-img" src="@/scripts/assets/img/logo.svg" alt="User Avatar" />

                  <div class="contacts-list-info">
                    <span class="contacts-list-name">
                      Nadia Jolie
                      <small class="contacts-list-date float-right">2/20/2015</small>
                    </span>
                    <span class="contacts-list-msg">I'll call you back at...</span>
                  </div>
                  <!-- /.contacts-list-info -->
                </a>
              </li>
              <!-- End Contact Item -->
              <li>
                <a href="#">
                  <img class="contacts-list-img" src="@/scripts/assets/img/logo.svg" alt="User Avatar" />

                  <div class="contacts-list-info">
                    <span class="contacts-list-name">
                      Nora S. Vans
                      <small class="contacts-list-date float-right">2/10/2015</small>
                    </span>
                    <span class="contacts-list-msg">Where is your new...</span>
                  </div>
                  <!-- /.contacts-list-info -->
                </a>
              </li>
              <!-- End Contact Item -->
              <li>
                <a href="#">
                  <img class="contacts-list-img" src="@/scripts/assets/img/logo.svg" alt="User Avatar" />

                  <div class="contacts-list-info">
                    <span class="contacts-list-name">
                      John K.
                      <small class="contacts-list-date float-right">1/27/2015</small>
                    </span>
                    <span class="contacts-list-msg">Can I take a look at...</span>
                  </div>
                  <!-- /.contacts-list-info -->
                </a>
              </li>
              <!-- End Contact Item -->
              <li>
                <a href="#">
                  <img class="contacts-list-img" src="@/scripts/assets/img/logo.svg" alt="User Avatar" />

                  <div class="contacts-list-info">
                    <span class="contacts-list-name">
                      Kenneth M.
                      <small class="contacts-list-date float-right">1/4/2015</small>
                    </span>
                    <span class="contacts-list-msg">Never mind I found...</span>
                  </div>
                  <!-- /.contacts-list-info -->
                </a>
              </li>
              <!-- End Contact Item -->
            </ul>
            <!-- /.contacts-list -->
          </div>
          <!-- /.direct-chat-pane -->
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <div>
            <div class="input-group">
              <input v-model="message" type="text" name="message" placeholder="Type Message ..." class="form-control" @keyup.enter="useSendMessage" />
              <span class="input-group-append">
                <button type="button" class="btn btn-primary" @click="useSendMessage">Send</button>
              </span>
            </div>
          </div>
        </div>
        <!-- /.card-footer-->
      </div>
      <!--/.direct-chat -->
    </div>
    <!-- /.container-fluid -->
  </div>
  <!-- /.content -->
</template>

<script setup>
import axios from "axios";
import { reactive, inject, ref, onMounted } from "vue";
import moment from "moment";

const user = ref(window.currentUser);
const messages = ref();
const message = ref();

onMounted(() => {
  fetchMessages();
});

const fetchMessages = async () => {
  // Make a request for a user with a given ID
  axios
    .get("/api/messages")
    .then(function (response) {
      // handle success
      console.log(response);
      messages.value = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};

function formatDate(value) {
  return moment(String(value)).format("MM-DD-YYYY hh:mm:ss");
}

function useSendMessage() {
  // Make a request for a user with a given ID
  axios
    .post("/api/messages", {
      user: user.value,
      message: message.value,
    })
    .then(function (response) {
      // handle success
      console.log(response);
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error.response.data);
      errorMessage.value = error.response.data.message;
      errors.value = error.response.data.errors;
    })
    .then(function () {
      // always executed
      message.value = "";
      fetchMessages();
    });
}

Echo.private("channel-name").listen("SendMessage", (e) => {
  messages.value.push({
    message: e.message.message,
    user: e.user,
  });
  fetchMessages();
});

</script>

<style lang="scss" scoped></style>
