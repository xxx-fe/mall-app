// import 'element-ui/lib/theme-chalk/index.css';
import {
    Pagination,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Message,
    Button,
    Input,
    InputNumber,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Radio,
    RadioGroup,
    RadioButton,
    Select,
    Option,
    Table,
    TableColumn,
    Dialog,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Loading,
    Upload
} from 'element-ui';

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Upload);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
