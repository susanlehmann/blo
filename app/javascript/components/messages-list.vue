<template lang="jade">
div
  .home-messages(v-for='message in messagesList', :key="message.id")
    message(:message="message", 
      @reply="reply => { addMessage(reply) }",
      @repost="repost => { addMessage(repost) }",
    )
  div(v-if="messagesList.length === 0 && !isLoading")
    .alert.alert-warning
      p 
        | {{ $t('no_message_show') }}
  div(v-if="isLoading")
    .text-center
      p {{ $t('loading_more_message') }}
      .space3
      i.fa.fa-spin.fa-spinner
  div(v-else)
    div(v-observe-visibility="bottomVisible")
  div(v-if="finished")
    .space3
    .text-center
      p {{ $t('looking_continue') }}
</template>

<script>
import _ from 'underscore';
export default {
  props: [
    'messages'
  ],
  data() {
    return {
      messagesList: [],
      page: 0,
      isLoading: true,
      finished: false
    };
  },
  methods: {
    addMessage(message) {
      this.messagesList.unshift(message);
    },
    async bottomVisible(isVisible) {
      if (!this.isLoading && isVisible && !this.finished && (this.messagesList.length > 0)) {
        this.fetchNextPage();
      }
    },
    async fetchNextPage() {
      this.isLoading = true;
      let { pathname, search } = document.location;
      const seperator = search.indexOf('?') === 0 ? '&' : '?';
      this.page += 1;
      let path = _.contains(['/all','/','/jp'], pathname) ? "/messages" : pathname;      let url = `${path}.json${search}${seperator}page=${this.page}`;
      if (pathname === "/all") {
        url += '&all=true';
      }
      
      try {
        const result = await $.ajax({
          url: url,
          type: 'get',
          dataType: 'json'
        }); 
        if (result.messages.length === 0) {
          this.finished = true;
        } else {
          if (result.finished) {
            this.finished = true;
          }
          this.messagesList = this.messagesList.concat(result.messages);
        }
      } catch (error) {
        console.log(error);
        this.finished = true;
      }

      this.isLoading = false;
    }
  },
  mounted() {
    this.messagesList = this.messages;
    this.isLoading = false;
    if (this.messages.length === 0) {
      this.fetchNextPage();
    } else {
      this.page = 1;
    }
  },
};
</script>

<style lang="sass" scoped>

</style>
