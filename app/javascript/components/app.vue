<template>
<div id="app">
  <notifications group="app-errors" :duration="-1"></notifications>
  <notifications group="app-message" :duration="10000"></notifications>
  <alerts ref="alerts"></alerts>
  <div id="page-outer">
    <div v-if="currentAccount" class="AppContent wrapper wrapper-home" id="page-container" style="margin-top: -80px;">
      <div class="dashboard dashboard-left" style="margin-left: -52px;">
        <user-card :account="currentAccount"></user-card>
      </div>
      <div class="content-main top-timeline-tweetbox" id="timeline" role="main" aria-labelledby="content-main-heading" tabindex="-1" style="margin-left: 40px;margin: 60px;">
        <common></common>
        <div class="timeline-tweet-box">
          <div class="home-tweet-box tweet-box component tweet-user">
            <textarea class="change-size form-control" v-bind:placeholder="$t('box_text')" v-model="newMessage" style="height: 60px;"></textarea>
            <a class="btn btn-primary mt-1" v-on:click="postMessage()" href="javascript:;" v-bind:class="{ disabled: !canSendNewMessage() }" :disabled="!canSendNewMessage()"><span v-if="!isLoading">{{ $t('post') }}</span><span v-else="v-else"><i class="fa fa-spin fa-spinner mr-1"></i>{{ $t('loading') }}</span></a>
            <div class="text-right mt-3 small pull-right"> <span v-if="newMessage.length &gt; 0" v-bind:class="{ 'text-muted': (newMessage.length &lt;= 280), 'text-danger': (newMessage.length &gt; 280) }"></span>Currently {{ newMessage.length }} {{ newMessage.length === 0 ? 'character' : 'characters' }}.<span class="text-muted"> Max 280 characters.</span></div>
          </div>
        </div><br>
        <div class="stream-container conversations-enabled js-request-more-stream-items">
          <div class="stream">
            <ol class="stream-items js-navigable-stream" id="stream-items-id">
              <li class="js-stream-item" id="stream-item-tweet-1078138020581130245" data-item-type="tweet">
                <messages-list :messages="[]" ref="messagesList"></messages-list>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div class="dashboard dashboard-right">
        <div class="module wtf-module js-wtf-module roaming-module has-content">
          <div class="flex-module">
            <div class="flex-module-header">
              <h3>Who to follow</h3>
              <small>.</small>
              <small class="view-all">
                <a class="js-view-all-link-nav" href="#" data-element-term="view_all_link">View all</a>
              </small>
            </div>
        </div>
      </div>
    </div>
    <show-user :account="currentAccount"></show-user>
  </div>
</div>
  
</template>

<script>
import moment from 'moment';
import batchEvents from '../libs/batch-events';
import FederatedTimeline from '../components/federated-timeline.vue';

export default {
  props: [
    '_messages'
  ],
  components: {
    'federated-timeline': FederatedTimeline,
  },
  data: function () {
    return {
      newMessage: "",
      isUser: null,
      userId: null,
      moment: moment,
      messages: [],
      replyBody: "",
      isLoading: false,
      currentAccount: window.currentAccount,
      anh1: "assets/bg-01.jpg",
    };
  },
  methods: {
    async postMessage() {
      if (!this.canSendNewMessage()) {
        return true;
      }
      const data = {
        body: this.newMessage,
        json_schema: 'micro'
      };

      const url = '/messages';
      const method = 'POST';

      this.newMessage = "";
      this.isLoading = true;

      try {
        const message = await $.ajax({
          url: url,
          data: data,
          dataType: 'json',
          method: method,
        });
        batchEvents.triggerNewBatch();
        this.addMessage(message);
      } catch (error) {
        console.log(error);
        this.newMessage = data.body;
        this.alertError(this.$t('error_post'));
      }

      this.isLoading = false;
      
    },
    userLink(username) {
      return `/u/${username}`;
    },
    addMessage(message) {
      this.$refs.messagesList.messagesList.unshift(message);
    },
    canSendNewMessage() {
      return !this.isLoading && (this.newMessage.length <= 280);
    }
  },
  computed: {
    isFollowingFeed() {
      return this.currentAccount && document.location.pathname == "/";
    }
  },
  mounted: async function () {
    this.messages = this._messages;
  }
};
</script>

<style scoped lang="scss">
.message {
  .message-actions {
    i {
      cursor: pointer;
    }
  }
  .username {
    max-width: 240px;
  }
}

.home-user {
  height: auto;
}
.home-user__welcome {
  p {
    font-size: 14px;
  }
}

.favorite-star {
  cursor: pointer;
}

.change-size {
  height: 240px;
  resize: none;
}

.down-top{
  margin-top: 50px;
}

﻿svg.RadialCounter {
      margin-bottom: -4px;
      overflow: visible;
      transform: rotate(-90deg);
    }

    .RadialCounter--safe {
      stroke: #FFB701;
    }

    .RadialCounter--warn {
      stroke: #ffad1f;
    }

    .RadialCounter--danger {
      stroke: #e0245e;
    }

    .RadialCounter-progressUnderlay {
      stroke: #ccd6dd;
    }

    @keyframes RadialCounterPulse {
      0% { stroke-width:2 }
      50% { stroke-width: 4; }
      100% { stroke-width: 2; }
    }

    .RadialCounter--danger.RadialCounter--pulse,
    .RadialCounter--warn.RadialCounter--pulse {
      animation: RadialCounterPulse 0.3s ease-in-out;
      animation-iteration-count: 1;
    }
</style>

