'use strict';

app.homeView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function (parent) {
    var homeViewModel = kendo.observable({
        fields: {
            /*
            password: 'password',
            email: 'top@gmail.com',
            */
            password: '',
            email: '',
            
        },
        submit: function(e) {
            var validator = $("#homeViewModel").data("kendoValidator");
            if (validator.validate()) {
                 $.ajax({
                        type: "POST",
                        url: "https://greenapi.odooportal.com/api/v1/login",
                        contentType: "application/json",
                        data: JSON.stringify({ login: homeViewModel.fields.email,password: homeViewModel.fields.password }),
                        success: function(result) {
                                                        
                            var token = null ;
                            localStorage.setItem("token",result.data.access_token);
                            //navigator.notification.alert(result.data.access_token);
                            app.mobileApp.navigate('components/welcome/view.html');
                            //token = result.data.access_token;
                            
                        },
                        error: function(result) {
                            //navigator.notification.alert(result);
                            navigator.notification.alert("ชื้อผู้เข้าใช้ หรือ รหัสไม่ถูกต้อง");
                            
                        }
                });
            }else{
                navigator.notification.alert("กรุณากรองข้อมูลให้ครบ");
            }
            
        },
        gotermofuse: function() {
                app.mobileApp.navigate('components/termsofuse/view.html');
            },
    });
    
    parent.set('homeViewModel', homeViewModel);
})(app.homeView);
// END_CUSTOM_CODE_homeView