Engine.Plugins.permissions = {
	element:{
		table:{index:{}},
	},
	forms:{
		create:{0:"name",1:"type",2:"level",extra:{ 0:"table"}},
		update:{0:"name",1:"type",2:"level",3:"lock",extra:{ 0:"table"}},
	},
	options:{create:{skip:['role_id']},update:{skip:['role_id']}},
	init:function(){
		Engine.GUI.Sidebar.Nav.add('Permissions', 'development');
	},
	load:{
		index:function(){
			Engine.Builder.card($('#pagecontent'),{ title: 'Permissions', icon: 'permissions'}, function(card){
				Engine.request('permissions','read',{
					data:{options:{ link_to:'PermissionsIndex',plugin:'permissions',view:'index' }},
				},function(result) {
					var dataset = JSON.parse(result);
					if(dataset.success != undefined){
						for(const [key, value] of Object.entries(dataset.output.dom)){ Engine.Helper.set(Engine.Contents,['data','dom','permissions',value.name],value); }
						for(const [key, value] of Object.entries(dataset.output.raw)){ Engine.Helper.set(Engine.Contents,['data','raw','permissions',value.name],value); }
						Engine.Builder.table(card.children('.card-body'), dataset.output.dom, {
							headers:dataset.output.headers,
							id:'PermissionsIndex',
							modal:true,
							key:'id',
							import:{ key:'id', },
							clickable:{ enable:true, view:'details'},
							controls:{ toolbar:true},
						},function(response){
							Engine.Plugins.permissions.element.table.index = response.table;
						});
					}
				});
			});
		},
	},
};

Engine.Plugins.permissions.init();
