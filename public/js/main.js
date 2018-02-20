/* eslint-disable eol-last */
$(document).ready(function() {
  window.getCSRFToken = function () {
    return $('meta[name="csrf-token"]').attr('content');
  };
});