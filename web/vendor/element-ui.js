//按需加载
import {
    Pagination,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Message,
    Button,
    Input,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Radio,
    RadioGroup,
    RadioButton,
    Select,
    Option
} from 'element-ui';

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Select);
Vue.use(Option);
Vue.prototype.$message = Message;