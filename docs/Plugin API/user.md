<a name="user"></a>

## user : <code>object</code>
Access data about employees.

**Kind**: global namespace  

* [user](#user) : <code>object</code>
    * [.User](#user.User)
        * [new User(id, name, password, barcode, enabled)](#new_user.User_new)
    * [.getUser()](#user.getUser) ⇒ <code>User</code>
    * [.getUserID()](#user.getUserID) ⇒ <code>number</code>
    * [.getUserByID()](#user.getUserByID) ⇒ <code>Promise.&lt;User&gt;</code>
    * [.listUsers([managerMode])](#user.listUsers) ⇒ <code>Promise.&lt;Array.&lt;User&gt;&gt;</code>

<a name="user.User"></a>

### user.User
**Kind**: static class of [<code>user</code>](#user)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> |  |
| name | <code>string</code> |  |
| pass | <code>string</code> |  |
| barcode | <code>string</code> |  |
| enabled | <code>boolean</code> |  |
| hasPassword() | <code>function</code> | Returns true if the user has a password set, else false. |
| checkPassword(string) | <code>function</code> | Returns true if the provided password matches the user's password, or if there is no password set. |
| icon(number) | <code>function</code> | Returns a SVG data URI with a procedurally-generated icon for the user.  Size defaults to 50px if not specified. |

<a name="new_user.User_new"></a>

#### new User(id, name, password, barcode, enabled)
A User object.


| Param | Type |
| --- | --- |
| id | <code>number</code> | 
| name | <code>string</code> | 
| password | <code>string</code> | 
| barcode | <code>string</code> | 
| enabled | <code>boolean</code> | 

<a name="user.getUser"></a>

### user.getUser() ⇒ <code>User</code>
Get the user currently logged in.

**Kind**: static method of [<code>user</code>](#user)  
<a name="user.getUserID"></a>

### user.getUserID() ⇒ <code>number</code>
Get the current user's ID number.

**Kind**: static method of [<code>user</code>](#user)  
<a name="user.getUserByID"></a>

### user.getUserByID() ⇒ <code>Promise.&lt;User&gt;</code>
Look up the User for an ID number.

**Kind**: static method of [<code>user</code>](#user)  
<a name="user.listUsers"></a>

### user.listUsers([managerMode]) ⇒ <code>Promise.&lt;Array.&lt;User&gt;&gt;</code>
Get a list of all users in the system.

**Kind**: static method of [<code>user</code>](#user)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [managerMode] | <code>boolean</code> | <code>false</code> | If false, list only active/enabled users, and if no users, return a default user account (user ID -1). If true, return all users in the database, and don't return a default account if the list is empty (return an empty list instead). |

