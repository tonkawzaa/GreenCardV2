'use strict';

app.information = kendo.observable({
    
    onShow: function(e) {
        
      
            var header_token = null;
            
           	var token = null;
        	token = localStorage.getItem("token");
            header_token =  "Bearer "+token;
            //navigator.notification.alert(header_token);
            $.ajax({
                        type: "POST",
                        url: "https://greenapi.odooportal.com/api/v1/points",
                        contentType: "application/json",
                		headers: {'Authorization' : header_token},
                        success: function(result) {                
                            //navigator.notification.alert(result.data);
                            kendo.unbind($("#headerinformation"));
                               kendo.bind($("#headerinformation"),result);
                        },
                        error: function(result) {
                            navigator.notification.alert(result);    
                        }
                });
                $.ajax({
                            type: "POST",
                            url: "https://greenapi.odooportal.com/api/v1/cert_types",
                            contentType: "application/json; charset=utf-8",
                            success: function(result) {
                            
                            //navigator.notification.alert(result.data); 
                            e.view.element.find("#certtype").kendoMobileListView({
        			            template: kendo.template($("#certtypestmp").html()),
        			            dataSource: result.data,
                     });
                        },
                        error: function(result) {
                            navigator.notification.alert(result.error_message);    
                        }
                 });
        
       
        
    },
    afterShow: function() {}
    

});

(function(parent) {

    var informationModel = kendo.observable({
       
        information: function() {
            //navigator.notification.alert("information");
				//app.mobileApp.navigate('components/information/view.html');
            app.mobileApp.navigate('components/welcome/view.html');
        },
         earn: function() {   
             navigator.notification.alert("earn");
				//app.mobileApp.navigate('components/earn/view.html');
        }, 
        burnPoint: function() {
            navigator.notification.alert("burnPoint");
				//app.mobileApp.navigate('components/burnPoint/view.html');
        },
       
    });

    parent.set('informationModel', informationModel);
})(app.information);
