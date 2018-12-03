<template>
<div id="page-outer">
  <div id="page-container" class="AppContent wrapper wrapper-home">
    <div class="dashboard dashboard-left">
      <div class="DashboardProfileCard  module">
        <a class="DashboardProfileCard-bg u-bgUserColor u-block" href="#" tabindex="-1" aria-hidden="true" rel="noopener"></a>
        <div class="DashboardProfileCard-content">
          <div class="DashboardProfileCard-avatarContainer">
            <div id="choose-photo" class="controls avatar-settings inline-upload-avatar dropdown center">
              <a class="DashboardProfileCard-avatarLink ProfileAvatar-placeholder u-inlineBlock js-nav js-tooltip profile-picture js-dropdown-toggle" href="#" title="Add a profile photo" tabindex="-1" aria-hidden="true" data-placement="top" data-scribe-element="profile_avatar" role="button" aria-haspopup="true">
                <div class="DashboardProfileCard-avatarImage u-borderUserColorLightHover u-bgUserColor" data-avatar-placeholder="true">
                </div>
                <img class="DashboardProfileCard-avatarImage js-action-profile-avatar" :src="account.avatar.medium" alt="" style="display:none">
              </a>
            </div>
          </div>
          <div class="DashboardProfileCard-userFields account-group">
            <div class="DashboardProfileCard-name u-textTruncate">
              <a class="u-textInheritColor js-nav" :href='"/u/"+account.username' rel="noopener">{{ account.username }}</a><span class="UserBadges"></span>
            </div>
            <span class="DashboardProfileCard-screenname u-inlineBlock u-dir" dir="ltr">
              <a class="DashboardProfileCard-screennameLink u-linkComplex u-linkClean js-nav" :href='"/u/"+account.username' rel="noopener"><span class="username u-dir" dir="ltr">@<b class="u-linkComplex-target">{{ account.username }}</b></span></a>
            </span>
          </div>
          <div class="ProfileCardStats">
            <ul class="ProfileCardStats-statList Arrange Arrange--bottom Arrange--equal">
              <li class="ProfileCardStats-stat Arrange-sizeFit">
                <a class="ProfileCardStats-statLink u-textUserColor u-linkClean u-block js-nav js-tooltip" title="0 Tweets" href="#" data-element-term="tweet_stats">
                  <span class="ProfileCardStats-statLabel u-block">{{ $t('address') }}</span>
                  <span>{{ shortAddress }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="ProfileOnboarding" style="display: block;margin-right:-22px;">
    <div class="js-first-tabstop" tabindex="1"></div>
    <div class="ProfileOnboarding-caret">
      <div class="ProfileOnboarding-caretInner"></div>
    </div>
    <div class="ProfileOnboarding-module module">
      <div class="ProfileOnboarding-bio" style="display: none;">
        <div class="ProfileOnboarding-header">
          <div class="dismiss js-action-dismiss"></div>
          <div class="ProfileOnboarding-title">Introduce yourself</div>
          <div class="ProfileOnboarding-subtitle">Describe who you are and what you're into.</div>
        </div>
        <div class="ProfileHeaderCardEditing-bioRich ProfileHeaderCardEditing-item">
          <div class="RichEditor RichEditor--emojiPicker u-borderUserColorLight">
            <div class="RichEditor-mozillaCursorWorkaround">&nbsp;</div>
            <div class="RichEditor-container u-borderRadiusInherit">
              <div class="RichEditor-scrollContainer u-borderRadiusInherit">
                <div name="user[description]" id="user_description" class="ProfileHeaderCardEditing-editableField rich-editor u-borderUserColorLight is-showPlaceholder" contenteditable="true" spellcheck="true" aria-multiline="true" data-placeholder="Bio" role="textbox" tabindex="2"></div>
                <div class="RichEditor-pictographs" aria-hidden="true"></div>
              </div>
              <div class="RichEditor-rightItems RichEditor-bottomItems"></div>
            </div>
          </div>
          <div class="RichEditor-mozillaCursorWorkaround">&nbsp;</div>
        </div>
      </div>
    </div>
    <div class="ProfileOnboarding-location" style="display: none;">
      <div class="ProfileOnboarding-header">
        <div class="dismiss js-action-dismiss"></div>
        <div class="ProfileOnboarding-title">Where do you live?</div>
        <div class="ProfileOnboarding-subtitle">Find people in the same location as you.</div>
      </div>
      <div class="ProfileHeaderCardEditing-location ProfileHeaderCardEditing-bioRich ProfileHeaderCardEditing-item dropdown">
        <span class="visuallyhidden" id="user_location_label">Location</span>
        <div class="RichEditor RichEditor--emojiPicker u-borderUserColorLight ProfileHeaderCardEditing-GeoLocationFieldInput">
          <div class="RichEditor-mozillaCursorWorkaround">&nbsp;</div>
          <div class="RichEditor-container u-borderRadiusInherit">
            <div id="user_location" name="user[location]" aria-multiline="true" aria-labelledby="user_location_label" class="ProfileHeaderCardEditing-editableField rich-editor u-borderUserColorLight GeoSearch-queryInput js-geo-search-trigger js-dropdown-prevent-close is-showPlaceholder" data-placeholder="Location" maxlength="30" autocomplete="off" role="textbox" tabindex="2" data-initial-location="" contenteditable="true"></div>
            <div class="RichEditor-pictographs" aria-hidden="true"></div>
          </div>
          <div id="profile-geo-dropdown" class="GeoSearch-dropdownMenu dropdown-menu">
            <div class="dropdown-caret" aria-hidden="true">
              <span class="caret-outer"></span>
              <span class="caret-inner"></span>
            </div>
            <ul role="presentation">
              <li class="GeoSearch-searchStatus" role="presentation"></li>
            </ul>
            <ul class="GeoSearch-resultsContainer" role="presentation"></ul>
          </div>
          <input class="ProfileHeaderCardEditing-locationPlaceId GeoSearch-placeId" type="hidden" name="user[location_place_id" value="">
        </div>
        <div class="RichEditor-mozillaCursorWorkaround">$nbsp;</div>
      </div>
    </div>
  </div>
  <div class="ProfileOnboarding-birthday" style="display: none;">
    <div class="ProfileOnboarding-header">
      <div class="dismiss js-action-dismiss"></div>
      <div class="ProfileOnboarding-title">Add your birthday</div>
      <div class="ProfileOnboarding-subtitle">Let celebrate with you.You're always in control of who can see it</div>
    </div>
    <div class="ProfileHeaderCardEditing-item">
      <div class="BirthdateSelect is-expanded" aria-labelledby="BirthdateSelect-label">
        <fieldset class="BirthdateSelect-fields is-expanded" tabindex="2">
          <div class="BirthdateSelect-info">
            This should be your date of birth,whether this account is for your business,event,or even your cat
          </div>
          <div class="BirthdateSelect-birthdat u-inlineBlock">
            <select class="BirthdateSelect-selectFields BirthdateSelect-month js-dateSelector js-dateSelectMonth u-borderUserColorLight t1-select" name="user[birthdate][month]" tabindex="2" aria-label="Month">
              <option aria-label="Choose" value="">Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">January</option>
              <option value="4">January</option>
              <option value="5">January</option>
              <option value="6">January</option>
              <option value="7">January</option>
              <option value="8">January</option>
              <option value="9">January</option>
              <option value="10">January</option>
              <option value="11">January</option>v
              <option value="12">January</option>
            </select>
            <select class="BirthdateSelect-selectFields BirthdateSelect-day js-dateSelector js-dateSelectDay u-borderUserColorLight t1-select" name="user[birthdate][day]" tabindex="2" aria=label="Day">
              <option aria-label="Choose" value="">Day</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">1</option>
              <option value="4">1</option>
              <option value="5">1</option>
              <option value="6">1</option>
              <option value="7">1</option>
              <option value="8">1</option>
              <option value="9">1</option>
              <option value="10">1</option>
              <option value="11">1</option>
            </select>
            <div class="VisibilitySettings u-inlineBlock u-textRight">
              <div class="dropdown"></div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: [
    'account'
  ],
  data() {
    return {
      updatedBalance: null
    };
  },
  computed: {
    balance() {
      return this.updatedBalance || this.account.balance;
    },
    shortAddress() {
      const len = this.account.address.length;
      const addr = this.account.address;
      return addr.slice(0,15) + '..' + addr.slice(len-15);
    },
    isCurrentAccount() {
      return currentAccount && this.account.id == currentAccount.id;
    },
    fediverseHandle() {
      return `@${currentAccount.username}@${document.location.host}`;
    }
  }
};
</script>

<style lang="sass" scoped>

</style>