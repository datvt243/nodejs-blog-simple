-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 01, 2021 lúc 06:00 PM
-- Phiên bản máy phục vụ: 10.4.20-MariaDB
-- Phiên bản PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `nodejs_blog`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(2) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `orders` int(2) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `slug`, `orders`, `isActive`) VALUES
(1, 'javascript', NULL, 'javascript', 1, 0),
(2, 'vuejs', NULL, 'vuejs', 2, 0),
(3, 'html', NULL, 'html', 3, 0),
(4, 'css', NULL, 'css', 4, 0),
(5, 'nodejs', NULL, 'nodejs', 3, 0),
(6, 'Có gì hot!', NULL, 'co-gi-hot', 4, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `id` int(3) NOT NULL,
  `author` int(3) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `category` int(2) NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shotDes` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `isPublish` tinyint(1) NOT NULL DEFAULT 0,
  `pubishedAt` date DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `tag` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `metaTitle` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `metaDes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `views` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`id`, `author`, `title`, `category`, `thumbnail`, `shotDes`, `content`, `slug`, `isActive`, `isPublish`, `pubishedAt`, `createdAt`, `updatedAt`, `deletedAt`, `tag`, `metaTitle`, `metaDes`, `views`) VALUES
(1, 27, 'Tạo web siêu dễ với VuePress và Github Pages ', 2, NULL, 'Gần đây mình có tìm hiểu cách tạo blog bằng Github Pages (GP). Mình bắt đầu bằng cách làm theo theo hướng dẫn trên trang chủ GP, và đúng là chỉ sau vài phút, bạn đã có ngay một trang web \"coi cũng được\". ', '<p>Gần đây mình có tìm hiểu cách tạo blog bằng Github Pages (GP). Mình bắt đầu bằng cách làm theo theo hướng dẫn trên trang chủ GP, và đúng là chỉ sau vài phút, bạn đã có ngay một trang web \"coi cũng được\". Tuy nhiên, nhìn blog thiên hạ màu mè các kiểu làm mình cũng muốn tìm hiểu cách thiết kế giao diện và trang trí cho website bắt mắt hơn, thì gặp Jekyll. Jekyll đã có sẵn hỗ trợ cho GP, mỗi tội máy tính của bạn phải có Ruby mới dùng được. Mình thì không thích cài những gì mà cả năm mới dùng tới, vả lại nếu chỉ để phục vụ mỗi việc tạo blog thì cũng không đáng. Thế là mình mò thêm các giải pháp khác và bắt gặp VuePress. Vô tình mình cũng đang làm việc với Vue, nên \"sao lại không nhỉ?\"</p><h3>VuePress là gì?</h3><p>VuePress là một sản phẩm của Evan You, tác giả của Vue, với mục đích tạo web tĩnh (static webpages). Về căn bản website xây dựng bằng VuePress là một SPA trên nền của Vue, Vue Router, và webpack. VuePress giúp bạn đơn giản hoá việc thiết lập SSR bằng Nuxt, cùng ti tỉ thứ khác.</p><p>Những tính năng chính của VuePress bao gồm:</p><ul><li>Hỗ trợ Markdown ngay từ đầu</li><li>Cho phép xây dựng theme bằng template của Vue</li><li>Hỗ trợ Service Worker</li><li>Tích hợp sẵn Google Analytics</li><li>Hiển thị \"Lần cập nhật gần nhất\" dựa vào thông tin từ Git</li><li>Hỗ trợ đã ngôn ngữ</li></ul><p>Chi tiết hơn bạn có thể xem <a href=\"https://vuepress.vuejs.org/guide/#features\">ở đây</a>.</p>', 'tao-web-sieu-de-voi-vuepress-va-github-pages', 0, 0, '2021-08-08', '2021-08-08', '2021-08-13', NULL, 'vuejs vuepress blog github_page', 'Tạo web siêu dễ với VuePress và Github Pages ', 'Gần đây mình có tìm hiểu cách tạo blog bằng Github Pages (GP). Mình bắt đầu bằng cách làm theo theo hướng dẫn trên trang chủ GP, và đúng là chỉ sau vài phút, bạn đã có ngay một trang web \"coi cũng được\". ', 0),
(2, 27, 'Tìm hiểu Map và Set trong JavaScript', 1, NULL, 'Được giới thiệu từ ES6, Map, Set, WeakMap, và WeakSet là những cấu trúc dữ liệu giúp thao tác trên tập hợp. Bài viết này sẽ giới thiệu cách hoạt động cũng như các ứng dụng của chúng.', '<p>Được giới thiệu từ ES6, Map, Set, WeakMap, và WeakSet là những cấu trúc dữ liệu giúp thao tác trên tập hợp. Bài viết này sẽ giới thiệu cách hoạt động cũng như các ứng dụng của chúng.</p><h3>Map</h3><p><i>Map</i>, <i>mảng kết hợp</i> (associate arrays) hay <i>từ điển</i> (dictionary/dict) là những thuật ngữ dùng để chỉ một cấu trúc dữ liệu, cho phép bạn ánh xạ từ một <i>khóa</i> (key) tương ứng với một <i>giá trị</i> (value). Trong JavaScript, chúng ta có thể sử dụng <i>object</i> để thể hiện cấu trúc này.</p><p>const dict = {\n &nbsp;hello: \'Xin chào\',\n &nbsp;bye: \'Tạm biệt\',\n}\n\nconsole.log(dict[\'hello\']) // Xin chào\n</p><p>Tuy nhiên, nếu dùng <i>object</i> thì bạn chỉ có thể dùng <i>chuỗi</i> làm <i>khóa</i>. Ngoài ra, cách này cũng có một số <a href=\"http://speakingjs.com/es5/ch17.html#_pitfalls_using_an_object_as_a_map\">hạn chế khác</a>. Lớp Map do ES6 giới thiệu sẽ giúp giải quyết những vấn đề này. Với Map, bạn có thể sử dụng bất cứ dạng dữ liệu nào để làm <i>khóa</i>.</p><p>const obj = { bar: 2 }\nconst dict = new Map()\ndict\n .set(\'foo\', 123)\n .set(obj, \'hello world\')\n\ndict.get(\'foo\') // 123\ndict.get(obj) &nbsp; // \'hello world\'\n\n// Lấy giá trị của một khóa không tồn tại\ndict.get(\'wat\') // undefined\n</p><p>Bạn cũng có thể truyền vào hàm dựng của Map một mảng các cặp giá trị dạng [key, value], ví dụ như sau:</p><p>const dict = new Map([\n &nbsp;[\'foo\', 123],\n &nbsp;[obj, \'hello world\']\n])\n</p><p>Như đã nói ở trên, bạn có thể dùng bất cứ dạng dữ liệu gì để làm <i>khóa</i> cho Map, kể cả mảng, object, hàm, hay NaN.</p><p>const arr = [1]\nconst f = () =&gt; {}\ndict\n .set(arr, \'an array\')\n .set(f, \'a function\')\n .set(NaN, \'not a number\')\n</p><p>Bản thân Map sử dụng phương thức so sánh <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#A_model_for_understanding_equality_comparisons\">SameValueZero</a> để tìm <i>khóa</i> và giá trị tương ứng. SameValueZero hoạt động tương tự như ===, nhưng xem các giá trị NaN bằng nhau, cũng như +0 bằng -0.</p><blockquote><p><strong>Đố-hẻm-vui</strong>: Đố bạn kết quả của các biểu thức sau là gì?</p><p>NaN == NaN NaN === NaN Object.is(NaN, NaN)</p></blockquote><p>Do SameValueZero nên hai <i>object</i> khác nhau sẽ là hai <i>khóa</i> riêng biệt.</p><p>const o1 = {}\nconst o2 = {}\n\ndict.set(o1, \'Ô Một\').set(o2, \'Ô Hai\')\ndict.get(o2) // Ô Hai\ndict.get({}) // undefined\n</p><p>Nếu trong map đã có sẵn <i>khóa</i>, dữ liệu mới sẽ bị ghi đè lên.</p><p>const m = new Map()\nm.set(\'foo\', 1)\nm.set(\'foo\', 2)\n\nm.get(\'foo\') // 2\n</p><p>Để duyệt qua các <i>khóa</i> và giá trị trong Map, bạn có thể dùng:</p><p>const dict = new Map([\n &nbsp;[\'foo\', 1], [\'bar\', 2]\n])\n\ndict.keys() &nbsp; &nbsp;// [\'foo\', \'bar\']\ndict.values() &nbsp;// [1, 2]\ndict.entries() // [ [\'foo\', 1], [\'bar\', 2] ]\ndict.forEach(function(value, key, map) {\n &nbsp;console.log(`${key} has ${value}`)\n}, /* thisArgs bạn có thể truyền vào tham chiếu cho `this` ở đây */)\n\n// Sử dụng for..of cùng với destructuring\nfor (let [key, value] of dict) {\n &nbsp;console.log(`${key} has ${value}`)\n}\n</p><p>Bạn cũng có thể dùng toán tử spread ... với Map</p><p>const dict = new Map([\n &nbsp;[\'foo\', 1], [\'bar\', 2]\n])\nconsole.log([\n &nbsp;[\'wut\', 3],\n &nbsp;...dict\n])\n// [ [ \'wut\', 3 ], [ \'foo\', 1 ], [ \'bar\', 2 ] ]\n</p><p>Một số thao tác khác với Map.</p><p>const dict = new Map([\n &nbsp;[\'foo\', 1], [\'bar\', 2]\n])\n\n// Đếm số cặp giá trị trong map\ndict.size // 2\n\n// Kiểm tra trong map có khóa \"foo\" hay không\ndict.has(\'foo\') // true\ndict.has(\'wut\') // false\n\n// Xóa một khóa, trả về boolean nếu thành công, false nếu thất bại\ndict.delete(\'wut\') // false\ndict.delete(\'foo\') // true\n\n// Xóa hết các cặp giá trị của map\ndict.clear()\n</p><blockquote><p><strong>Tại sao lại là size mà không phải length?</strong> Một số độc giả tinh ý sẽ nhận ra chúng ta dùng size thay vì length để đếm số cặp giá trị trong map. Lý do là vì: length dùng cho những chuỗi có thể index (đánh số) được, ví dụ với <i>mảng</i> ta có thể arr[3]. Ngược lại, size dành cho những cấu trúc không có thứ tự như Map và Set.</p></blockquote><h3>Set</h3><p>Set là tập hợp các giá trị không bị trùng lặp, nghĩa là trong một <i>set</i> không thể có hai giá trị bằng nhau.</p><p>const s = new Set()\nset\n &nbsp;.add(\'red\')\n &nbsp;.add(\'blue\')\n &nbsp;.add(\'sweet\')\n &nbsp;.add(\'you\')\n\ns.size // 4\n</p><p>Bạn cũng có thể truyền một <i>mảng</i> vào hàm dựng của Set.</p><p>const s = new Set([\'red\', \'blue\', \'sweet\', \'red\', \'you\'])\nconsole.log(s) // Set (4) {\'red\', \'blue\', \'sweet\', \'you\'}\n</p><p>Bạn cũng có thể thấy giá trị \'red\' bị trùng lặp đã được loại bỏ. Chúng ta có thể áp dụng Set để tạo ra một <i>mảng</i> chứa những phần tử duy nhất.</p><p>const a = [\'red\', \'blue\', \'sweet\', \'red\', \'you\']\nconst b = [...new Set(a)]\nconsole.log(b) // [ \'red\', \'blue\', \'sweet\', \'you\' ]\n</p><p>Cũng tương tự như Map, Set sử dụng SameZeroValue để so sánh các phần tử với nhau.</p><p>const obj = {}\nconst s = new Set([NaN, {}, obj])\ns.has(NaN) // true\ns.has(obj) // true\ns.has({}) &nbsp;// false\n</p><p>Để duyệt qua các phần tử của Set, bạn có thể dùng các phương thức như với Map.</p><p>const s = new Set([1, 2, 3, 4, 5])\n\n// Vì Set không có khái niệm keys nên kết quả của `s.keys()` và `s.values()` là như nhau.\ns.keys()\ns.values()\n\ns.entries()\ns.forEach(function(value, key, setReference) {\n}, thisArg)\n\nfor (let el of s) {\n &nbsp;console.log(el)\n}\n</p><p>Một số thao tác khác trên Set.</p><p>const s = new Set([1, 2, 3, 4, 5])\n\n// Xóa một phần tử trong set\ns.delete(3) // Set (4) {1, 2, 4, 5}\n\n// Xóa hết phần tử trong set\ns.clear()\n</p><h3>WeakMap và WeakSet</h3><p>ES6 cũng giới thiệu hai lớp WeakMap và WeakSet. So với Map, các <i>khóa</i> của WeakMap bắt buộc phải là <i>object</i>, và chúng sẽ bị giải phóng khỏi bộ nhớ (garbage-collecting -- \"hốt rác\") đầu tiên nếu không có tham chiếu nào.</p><p>WeakMap có các phương thức tương tự như Map, ngoại trừ việc bạn không thể duyệt qua WeakMap bằng .keys(), .values(), .entries() hay for..of. Bạn cũng không thể .clear(), vì lý do an toàn dữ liệu.</p><p>Một ứng dụng của WeakMap là dùng để chứa dữ liệu private mà không gây ra rò rỉ bộ nhớ.</p><p>const privates = new WeakMap()\n\nclass User {\n &nbsp;constructor() {\n &nbsp; &nbsp;const data = { phoneNumber: 123 }\n &nbsp; &nbsp;privates.set(this, data)\n &nbsp;}\n\n &nbsp;getPhoneNumber() {\n &nbsp; &nbsp;const data = privates.get(this)\n &nbsp; &nbsp;return data.phoneNumber\n &nbsp;}\n}\nconst u = new User()\nconsole.log(u) // {}\nconsole.log(u.getPhoneNumber()) // 123\n</p><p>Tương tự như WeakMap, WeakSet cũng chỉ có thể chứa <i>object</i>, và nếu một phần tử trong WeakSet không có tham chiếu tới, nó sẽ bị giải phóng khỏi bộ nhớ.</p><h3>Kết luận</h3><p>Với những cải tiến so với <i>object</i> thông thường, Map sẽ là công cụ hữu hiệu để lưu trữ dữ liệu dạng (khóa, giá trị). Trong khi đó, Set giúp bạn lưu trữ chuỗi dữ liệu mà không lo lắng về việc trùng lắp giá trị.</p>', 'tim-hieu-map-va-set-trong-javascript', 0, 0, '2021-08-10', '2021-08-10', '2021-08-19', NULL, 'javascript map set es6', '', '', 0),
(3, 27, 'Thêm Post mới', 1, NULL, 's sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf ', '<p>s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf&nbsp;s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf&nbsp;s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf&nbsp;s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf&nbsp;</p><blockquote><p>s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf&nbsp;s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf&nbsp;s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf&nbsp;</p></blockquote><figure class=\"table\"><table><tbody><tr><td>Th</td><td>Th</td><td>Th</td><td>Th</td></tr><tr><td>td</td><td>td</td><td>td</td><td>td</td></tr></tbody></table></figure>', 'them-post-moi', 0, 0, '2021-08-10', '2021-08-10', '2021-08-22', '2021-09-01', '', '', '', 0),
(4, 27, 'Thêm Post mới adfadsf kkkkk', 1, NULL, 's sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf ', '<p>s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf&nbsp;s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf&nbsp;s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf&nbsp;s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf&nbsp;</p><p>s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf&nbsp;s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf&nbsp;s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf s sdafsfaf&nbsp;</p>', 'them-post-moi-adfadsf-kkkkk', 0, 0, '2021-08-10', '2021-08-10', '2021-08-20', '2021-09-01', '', '', '', 0),
(5, 27, 'olalala maria', 2, NULL, 'dfa af afa d', '<p>asf asf adf adf af af</p>', 'olalala-maria', 0, 0, '2021-08-10', '2021-08-10', '2021-08-19', NULL, '', '', '', 0),
(6, 27, 'Thêm Post mới 01', 5, NULL, 'Thêm Post mới 01', '<p>Thêm Post mới 01</p>', 'them-post-moi-01', 0, 0, '2021-08-10', '2021-08-10', '2021-08-17', NULL, 'demo js', 'Thêm Post mới 01', 'Thêm Post mới 01', 0),
(7, 27, 'Thêm Post mới 01', 1, NULL, 'Thêm Post mới 01', '<p>Thêm Post mới 01</p>', 'them-post-moi-01', 0, 0, '2021-08-10', '2021-08-10', NULL, NULL, 'demo js', 'Thêm Post mới 01', 'Thêm Post mới 01', 0),
(8, 27, 'Thêm Post mới 03', 3, NULL, 'Thêm Post mới 03', '<p>Thêm Post mới 03</p>', 'them-post-moi-03', 0, 0, '2021-08-10', '2021-08-10', NULL, NULL, '', '', '', 0),
(9, 27, 'Thêm Post mới 03', 3, NULL, 'Thêm Post mới 03', '<p>Thêm Post mới 03</p>', 'them-post-moi-03', 0, 0, '2021-08-10', '2021-08-10', NULL, NULL, '', '', '', 0),
(10, 27, 'Thêm Post mới 04', 6, NULL, 'Thêm Post mới 04', '<p>Thêm Post mới 04</p>', 'them-post-moi-04', 1, 0, '2021-08-10', '2021-08-10', NULL, '2021-09-01', '', '', '', 0),
(11, 27, 'Thêm Post mới 05 f', 1, NULL, 'Thêm Post mới 05', '<p>Thêm Post mới 05</p>', 'them-post-moi-05-f', 0, 0, '2021-08-10', '2021-08-10', '2021-08-20', NULL, '', '', '', 0),
(12, 27, 'Thêm Post mới 04 11 22', 1, NULL, 'Thêm Post mới 04Thêm Post mới 04', '<p>Thêm Post mới 04</p>', 'them-post-moi-04-11-22', 0, 0, '2021-08-10', '2021-08-10', '2021-08-16', NULL, '', '', '', 0),
(13, 27, 'Thêm Post mới 06', 4, NULL, 'Thêm Post mới 06', '<p>Thêm Post mới 06</p>', 'them-post-moi-06', 0, 0, '2021-08-10', '2021-08-10', NULL, '2021-09-01', '', '', '', 0),
(14, 27, 'Thêm Post mới 06 111111', 4, NULL, 'Thêm Post mới 06 11111', '<p>Thêm Post mới 06 asdasdfa d</p>', 'them-post-moi-06-111111', 0, 1, '2021-08-10', '2021-08-10', '2021-08-19', NULL, '', '', '', 0),
(15, 27, 'CSS new post', 4, NULL, 'aada sdf a', '<p>adfa daf</p>', 'css-new-post', 0, 0, '2021-08-17', '2021-08-17', NULL, NULL, '', '', '', 0),
(16, 27, 'asdfa dadf aaaa 1111', 3, NULL, 'a sdfadf', '<p>asdfa sd asd</p>', 'asdfa-dadf-aaaa-1111', 0, 1, '2021-08-19', '2021-08-19', '2021-08-19', NULL, '', '', '', 0),
(17, 27, 'ádfadfsa', 5, NULL, '', '', 'adfadfsa', 0, 0, '2021-08-29', '2021-08-29', '2021-08-29', NULL, '', '', '', 0),
(18, 27, 'post 11111', 2, NULL, '', '<p>ádadadf</p>', 'post-11111', 0, 0, '2021-08-29', '2021-08-29', '2021-09-01', NULL, '', '', '', 0),
(19, 27, 'post mới đây olala', 1, NULL, 'mo ta ngan day', '<p>asdjlakj askjas kajsf</p>', 'post-moi-day-olala', 0, 0, '2021-08-30', '2021-08-30', '2021-09-01', NULL, '', '', '', 0),
(20, 28, 'Post cua demo', 3, NULL, 'demo demo demo demo demo demo demo demo demo demo demo demo ', '<p>demo demo&nbsp;demo&nbsp;demo&nbsp;demo&nbsp;demo&nbsp;demo demo&nbsp;demo&nbsp;demo&nbsp;demo&nbsp;demo&nbsp;demo demo&nbsp;demo&nbsp;demo&nbsp;demo&nbsp;demo&nbsp;demo demo&nbsp;demo&nbsp;demo&nbsp;demo&nbsp;demo&nbsp;demo demo&nbsp;demo&nbsp;demo&nbsp;demo&nbsp;demo&nbsp;</p>', 'post-cua-demo', 0, 0, '2021-09-01', '2021-09-01', NULL, NULL, '', '', '', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(3) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sex` tinyint(1) DEFAULT 0,
  `birthday` date DEFAULT NULL,
  `createdAt` date NOT NULL,
  `editedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `userRole` tinyint(1) NOT NULL DEFAULT 0,
  `lastLogin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `sex`, `birthday`, `createdAt`, `editedAt`, `deletedAt`, `isActive`, `avatar`, `userRole`, `lastLogin`) VALUES
(27, 'Võ Tấn', 'votan.it@gmail.com', '$2a$10$RsvNJ4IrM3Qw9s0saShdxeWzDbTQZVV17G6LyqWNYBFc6FhDxckA6', 0, NULL, '2021-08-06', NULL, NULL, 0, NULL, 1, '2021-08-20'),
(28, 'Nguyễn Thị Demo 1', 'demo@gmail.com', '$2a$10$6AA4J1kZgXCCJwMONrnQXefRteUEB5yXyc/737W/Fj5xud2daOpzS', 0, NULL, '2021-08-06', NULL, NULL, 0, NULL, 0, NULL),
(29, 'Nguyễn Thị Demo 2', 'demo1@gmail.com', '$2a$10$trYvRELA56pAPsiJ9wGVteXEue0nm/Gci5/jFEaWjecaG.Zmcg2e.', 0, NULL, '2021-08-06', NULL, NULL, 0, NULL, 0, NULL),
(30, 'Nguyễn Thị Demo 2', 'demo2@gmail.com', '$2b$10$YEabdzBGC6Rno7DoQ0skpOLp0FitVLb/K2W2j4QxxUCFhmFVzYzrW', 0, NULL, '2021-08-06', NULL, NULL, 0, NULL, 0, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
