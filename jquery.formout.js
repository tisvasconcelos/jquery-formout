/*
 *  Project: formOut
 *  Description: Check if user modify form and confirm if user want to get out page
 *  Author: Tiago Vasconcelos
 *  License: 
 */

;(function ( $, window, undefined ) {

    var methods = {
        options: {},
        data: null,
        init: function() { 
            methods.data = methods.get();
            methods.out();
        },
        out: function(){
            if(methods.options.closeWindow){
                window.onbeforeunload = confirmClose;
                function confirmClose(){
                    if(methods.data != methods.get($this))
                        return methods.options.message;
                }
            }

            $(methods.options.area).unbind().on('click', function(e){
                if(methods.data != methods.get($this)){
                    if(!confirm(methods.options.message+'\n\n'+methods.options.question))
                        e.preventDefault();
                }
            });
        },
        get: function(){
            var serialize = $this.serialize();
            $('input:file').each(function(){
                serialize += $(this).attr('name')+'='+$(this).val();
            });

            return serialize;
        }
    };

    $.fn.formOut = function(options) {  
        $this = $(this);

        methods.options = $.extend({
            'area'        : false,
            'closeWindow' : true,
            'message'     : 'Atenção: Você não salvou os dados preenchidos desta página. Ao sair os dados serão perdidos.',
            'question'    : 'Tem certeza de que deseja sair da página?'
        }, options);

        methods.init();
    };

}(jQuery, window));