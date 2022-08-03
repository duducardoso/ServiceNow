//aparece na console do browser em formato de arvore
//passa o objeto como parametro
console.dir(g_form);
g_form.getTableName();

//existe o JavaScript Executor ctrl+shift+j
g_form.getValue('fieldName');
g_form.setValue('fieldName', 'valor');
g_form.clearValue('fieldName');
g_form.isMandatory('fieldName');
g_form.setMandatory('fieldName', true);
g_form.setDisabled('fieldName', true);
g_form.getLabelOf('fieldName');

g_form.save();
g_form.hideRelatedLists();
g_form.showRelatedLists();
g_form.isNewRecord();

alert('message');
g_form.addInfoMessage('Message');
g_form.addErrorMessage('Message');
g_form.clarMessages();

console.dir(g_user);
g_user.firstName;
g_user.lastName;
g_user.userID;
g_user.userName;
g_user.getFullName();
//return true or false
g_user.hasRoles();
g_user.hasRole('role_name');