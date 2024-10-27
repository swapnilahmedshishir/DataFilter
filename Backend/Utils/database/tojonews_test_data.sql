-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 02, 2024 at 08:28 AM
-- Server version: 10.6.19-MariaDB
-- PHP Version: 8.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tojonews_test_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `email`, `password`) VALUES
(1, 'admin@gmail.com', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `clientlist`
--

CREATE TABLE `clientlist` (
  `ID` int(50) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `divisionName` varchar(100) NOT NULL,
  `districtName` varchar(100) DEFAULT NULL,
  `upazillaName` varchar(150) DEFAULT NULL,
  `unNameEn` varchar(300) DEFAULT NULL,
  `unNameBn` varchar(300) DEFAULT NULL,
  `unLinkOne` varchar(500) DEFAULT NULL,
  `unLinkTwo` varchar(500) DEFAULT NULL,
  `upSecretaryName` varchar(150) DEFAULT NULL,
  `UpEmail` varchar(255) DEFAULT NULL,
  `upContactNumber` varchar(50) NOT NULL,
  `upWhatsappNumber` varchar(50) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `unionInfo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clientlist`
--

INSERT INTO `clientlist` (`ID`, `uuid`, `divisionName`, `districtName`, `upazillaName`, `unNameEn`, `unNameBn`, `unLinkOne`, `unLinkTwo`, `upSecretaryName`, `UpEmail`, `upContactNumber`, `upWhatsappNumber`, `gender`, `unionInfo`) VALUES
(5, 'ff18cbb9-2d98-415e-a01b-2c82f291eb0b', '2', '13', '117', 'chakla', 'চাকলা', 'https://www.google.com/', 'https://www.google.com/', 'swapnil ahmed shishir', 'ahmed66882298@gmail.com', '01766882298', '01602555023', 'male', '<p>Write union infomation</p>'),
(6, 'dc8eb462-1e27-4844-b91f-df011aa673cb', 'Barishal', 'Barishal', 'Babuganj', 'Darial', 'দাড়িয়াল', 'https://prottoyon.gov.bd/register/employeer', 'https://www.google.com/', 'swapnil ahmed shishir', 'ahmed66882298@gmail.com', '01766882298', '01602555023', 'male', '<p>Write union infomation</p>'),
(8, 'c7feb0db-696b-4932-a0fd-717e7bdcb82d', '2', '13', '117', 'Koitola', 'কৌটোলা', 'https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwitttXJz7iIAxWP-DgGHQx2AOAQPAgI', 'https://www.google.com/', 'ahmed', 'ahmed66882298@gmail.com', '01766882298', '454654564646', 'female', '<p>Write union infomation</p>'),
(9, 'ffead06b-9d3f-422a-a6d4-10676d0dce97', 'Dhaka', 'Dhaka', 'Keraniganj', 'Kolatiya', 'কলাতিয়া', 'https://prottoyon.gov.bd/register/employeer', 'https://www.google.com/', 'swapnil ahmed shishir', 'ahmed66882298@gmail.com', '01766882298', '01602555023', 'male', '<p>Write union infomation</p>'),
(10, 'b142c605-32d9-4b9d-8143-8194af6a0595', '2', '13', '114', 'pakshi', 'পাকশি', 'https://www.google.com/', 'https://www.google.com/', 'swapnil ahmed shishir', 'ahmed66882298@gmail.com', '01766882298', '01602555023', 'male', '<p>Write union infomation</p>'),
(11, 'b6a7d785-b89b-400f-9c7c-6f176f855ad1', 'Dhaka', 'Faridpur', 'Barura', 'test union', 'টেস্ত ইউনিয়ন', 'https://www.google.com/', 'https://www.google.com/', 'swapnil ahmed shishir', 'ahmed66882298@gmail.com', '0125636555', '0123698574', 'male', '<p>Write union infomation</p>'),
(12, '19cd63a3-1d31-4415-a20d-0bdda9a31ad9', 'Dhaka', 'Gazipur', 'Gazipur Sadar', 'Darial', 'দাড়িয়াল', 'https://www.google.com/', 'https://www.google.com/', 'swapnil ahmed shishir', 'ahmed66882298@gmail.com', '01766882298', '01602555023', 'male', '<p>Write union infomation</p>'),
(13, '86123757-2a95-4a63-9a31-356e7bfd5643', 'Chattogram', 'Cumilla', 'Laksam', 'asdf', 'asdf', 'http://sundalpurup.gov.bd/', 'http://sundalpurup.gov.bd/login', 'asdf', 'asdf@gmail.com', '01840325244', '', '', '<p>Write union infomation</p>'),
(14, '7d94536b-4644-4d88-969b-92b6d2083884', '1', '8', '65', 'Darial', 'দাড়িয়াল', 'https://bdapis.com/', 'https://bdapis.com/', 'Swapnil ahmed shishir', 'swebcoderservice@gmail.com', '01602555023', '01602555023', '', '<p>Write union infomation</p>'),
(15, 'c6f5cbc2-685a-4065-b7b7-b6c8652500ba', '2', '13', '117', 'sundalpurup.gov.bd', 'sundalpurup.gov.bd', 'https://docs.google.com/spreadsheets/d/1HeozAgL3-p5Wa6ebx4SDwABuYGb3-4Fj/edit?gid=218185878#gid=218185878', 'https://docs.google.com/spreadsheets/d/1HeozAgL3-p5Wa6ebx4SDwABuYGb3-4Fj/edit?gid=218185878#gid=218185878', 'sundalpurup.gov.bd', 'sundalpurup@GMAIL.COM', '01840325244', '', '', '<p>Write union infomation</p>'),
(16, 'b135db43-2b12-421f-a190-31146ddd9904', '1', '1', 'Lalmai', 'Test', 'Test', 'https://demo.smartunionbd.com/login', '', 'Asdf', 'Admin@gmail.com', '01840325244', '', '', '<p>Write union infomation</p>');

-- --------------------------------------------------------

--
-- Table structure for table `contactlist`
--

CREATE TABLE `contactlist` (
  `uuid` varchar(50) NOT NULL,
  `contactName` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `mobileNo` varchar(255) DEFAULT NULL,
  `eamil` varchar(255) DEFAULT NULL,
  `note` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contactlist`
--

INSERT INTO `contactlist` (`uuid`, `contactName`, `category`, `mobileNo`, `eamil`, `note`) VALUES
('b661968d-0bc6-45b3-95ef-775850922b83', 'Jon Stewart Doe', '', '6019521325', 'test@example.us', '<p>Get Start ...</p>');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `clientlist`
--
ALTER TABLE `clientlist`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `contactlist`
--
ALTER TABLE `contactlist`
  ADD PRIMARY KEY (`uuid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `clientlist`
--
ALTER TABLE `clientlist`
  MODIFY `ID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
