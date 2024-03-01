// url tinh thanh API
export const  tinhthanhApi = "https://provinces.open-api.vn/api/?depth=2";

// nhom userid
export const doanhnghiepcd = 8;
export const kythuatcd = 4;
export const khachlecd = 5;
export const quanlycd = 1;
export const nhacungcap = 12;// chưa xác định


// type notifi
export const System = 'system';
export const Notifi = 'notifi';
export const Vison = 'vison';

// path socket.io
export const PathSocket = "http://localhost:3006"// http://localhost:3006, http://nanp.bounceme.net:3006

//phong ban
export const Ant100addPhongban = 'phongban/ant100addPhongban';
export const Ant100editPhongban = 'phongban/ant100editPhongban';
export const Ant100delPhongban = 'phongban/ant100delPhongban';
export const Ant100getAllPhongban = 'phongban/ant100getAllPhongban';
export const Ant100getIdPhongban = 'phongban/ant100getIdPhongban';

//User account
export const Ant100UserLogin = 'user/login';
export const Ant100UserGetMenu = 'user/menu';
export const Ant100findAllUser = 'user/ant100SearchAllUser';
export const Ant100UserFindByDepartmentId = 'user/ant100userfindbydepartmentid';
export const Ant100GetDetailUser = 'user/ant100GetDetailUser';
export const Ant100EditDetailUser = 'user/ant100EditDetailUser';
export const Ant100DeleteUsers = 'user/ant100DeleteUsers';
export const Ant100AddDetailUser = 'user/ant100AddDetailUser';
export const Ant100CheckEmailUser = 'user/ant100CheckEmailUser';
export const Ant100CheckNameUser = 'user/ant100CheckNameUser';
export const Ant100ChangePasswordUser = "user/ant100ChangePasswordUser";

//role
export const Ant100SearchAllRole = 'role/ant100SearchAllRole';
export const Ant100GetSearchAllRole = 'role/ant100GetSearchAllRole';
export const Ant100GetDetailRole = 'role/ant100GetDetailRole';
export const Ant100EditDetailRole = 'role/ant100EditDetailRole';
export const Ant100AddDetailRole = 'role/ant100AddDetailRole';
export const Ant100DelDetailRole = 'role/ant100DelDetailRole';
export const Ant100GetPermissionRole = 'role/ant100GetpermissionRole';
export const Ant100PutPermissionRole = 'role/ant100PutpermissionRole';

//menu
export const Ant100SearchFatherMenu = 'menu/ant100SearchFatherMenu';
export const Ant100AddMenu = 'menu/ant100AddMenu';
export const Ant100EditMenu = 'menu/ant100EditMenu';
export const Ant100DelMenu = 'menu/ant100DelMenu';
export const Ant100PostDetailMenu = 'menu/ant100PostDetailMenu';
export const Ant100ListMenu = 'menu/ant100ListMenu';
export const Ant100ListMenuParams = 'menu/ant100ListMenuParams';
export const Ant100PostUrlParams = 'menu/ant100PostUrlParams';

// data SC
export const Ant100findAllDatasc = 'screenpc/ant100SearchAllDatasc';
export const Ant100AddListDatasc = 'screenpc/ant100AddListDatasc';
export const Ant100DelDatasc = 'screenpc/ant100DelDatasc';
export const Ant100EditDatasc = 'screenpc/ant100EditDatasc';
export const Ant100DetailDatasc = 'screenpc/ant100DetailDatasc';

// upload file 
export const Tmt010Ant100SaveFile = 'tmt010/tmt010Ant100SaveFile';

// nhật ký hệ thống
export const NhatkyhethongfindType = "nhatkyhethong/nhatkyhethongAnt100getAll";

// tmt101. master
export const Tmt101Ant100Create = 'tmt101/tmt101Ant100Create';
export const Tmt101Ant100Update = 'tmt101/tmt101Ant100Update';
export const Tmt101Ant100Detail = 'tmt101/tmt101Ant100Detail';
export const Tmt101Ant100GetDetail = 'tmt101/tmt101Ant100GetDetail';
export const Tmt101Ant100Searchparam = 'tmt101/tmt101Ant100Searchparam';
export const Tmt101Ant100FindAll = 'tmt101/tmt101Ant100FindAll';


// tmt050
export const Tmt050listRcdkbn = 'tmt050/tmt050FindRcdkbn';

// tmt140_qualities
export const Tmt140listqualities = 'tmt140/tmt140getlistqty';

// tmt170
export const Tmt170listdelimthd = 'tmt170/tmt170listdelimthd';

// tmt171
export const Tmt171listpaymethd = 'tmt171/tmt171listpaymethd';


// province Api
export const Apiprovinces = 'master/apiprovinces';


// stock
export const StockListProduct = 'stock/stockListProduct';

// spot00101
export const Spot00101NewOrder = 'spot00101/spot00101neworder';
export const Spot00101OrderStatus = 'spot00101/spot00101orderstatus';
export const Spot00101UpdateOrder = 'spot00101/spot00101updateorder';
export const Spot00101DeleteOrder = 'spot00101/spot00101deleteorder'


// product categories
export const ProductCategogy = 'product/productcategories'
// product spmt00101
export const Spmt00101FindCondition = 'spmt00101/spmt00101findcondition';
export const Spmt00101AddNew = 'spmt00101/spmt00101addnew';
export const Spmt00101Edit = 'spmt00101/spmt00101Edit';


// report
export const ReportInbaogia = 'report/inbaogiareport';