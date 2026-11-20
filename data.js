/* BACKEND · data.js — airports, distance, menu, promo codes, cabin classes */
/* ===== data ===== */
const APL=`DEL|Delhi|Indira Gandhi International|India|28.56|77.10
BOM|Mumbai|Chhatrapati Shivaji Maharaj International|India|19.09|72.87
BLR|Bengaluru|Kempegowda International|India|13.20|77.71
HYD|Hyderabad|Rajiv Gandhi International|India|17.24|78.43
MAA|Chennai|Chennai International|India|12.99|80.17
CCU|Kolkata|Netaji Subhas Chandra Bose International|India|22.65|88.45
AMD|Ahmedabad|Sardar Vallabhbhai Patel International|India|23.08|72.63
PNQ|Pune|Pune Airport|India|18.58|73.92
GOI|Goa|Dabolim Airport|India|15.38|73.83
GOX|Goa (Mopa)|Manohar International|India|15.74|73.87
COK|Kochi|Cochin International|India|10.15|76.40
TRV|Thiruvananthapuram|Trivandrum International|India|8.48|76.92
CCJ|Kozhikode|Calicut International|India|11.14|75.95
CJB|Coimbatore|Coimbatore International|India|11.03|77.04
IXM|Madurai|Madurai Airport|India|9.83|78.09
IXE|Mangaluru|Mangaluru International|India|12.96|74.89
TIR|Tirupati|Tirupati Airport|India|13.63|79.54
VGA|Vijayawada|Vijayawada Airport|India|16.53|80.80
VTZ|Visakhapatnam|Visakhapatnam Airport|India|17.72|83.22
RJA|Rajahmundry|Rajahmundry Airport|India|17.11|81.82
BBI|Bhubaneswar|Biju Patnaik International|India|20.24|85.82
GAU|Guwahati|Lokpriya Gopinath Bordoloi International|India|26.11|91.59
IMF|Imphal|Bir Tikendrajit International|India|24.76|93.90
IXB|Bagdogra|Bagdogra Airport|India|26.68|88.33
PAT|Patna|Jay Prakash Narayan International|India|25.59|85.09
IXR|Ranchi|Birsa Munda Airport|India|23.31|85.32
VNS|Varanasi|Lal Bahadur Shastri International|India|25.45|82.86
LKO|Lucknow|Chaudhary Charan Singh International|India|26.76|80.89
JAI|Jaipur|Jaipur International|India|26.82|75.81
UDR|Udaipur|Maharana Pratap Airport|India|24.62|73.90
JDH|Jodhpur|Jodhpur Airport|India|26.25|73.05
IDR|Indore|Devi Ahilya Bai Holkar|India|22.72|75.80
BHO|Bhopal|Raja Bhoj Airport|India|23.29|77.34
NAG|Nagpur|Dr. Babasaheb Ambedkar International|India|21.09|79.05
RPR|Raipur|Swami Vivekananda Airport|India|21.18|81.74
IXC|Chandigarh|Chandigarh International|India|30.67|76.79
ATQ|Amritsar|Sri Guru Ram Dass Jee International|India|31.71|74.80
DED|Dehradun|Jolly Grant Airport|India|30.19|78.18
SXR|Srinagar|Sheikh ul-Alam International|India|33.99|74.77
IXL|Leh|Kushok Bakula Rimpochee|India|34.14|77.55
IXZ|Port Blair|Veer Savarkar International|India|11.64|92.73
DXB|Dubai|Dubai International|UAE|25.25|55.36
AUH|Abu Dhabi|Zayed International|UAE|24.43|54.65
SHJ|Sharjah|Sharjah International|UAE|25.33|55.52
DOH|Doha|Hamad International|Qatar|25.27|51.61
MCT|Muscat|Muscat International|Oman|23.59|58.28
KWI|Kuwait City|Kuwait International|Kuwait|29.23|47.97
BAH|Manama|Bahrain International|Bahrain|26.27|50.63
RUH|Riyadh|King Khalid International|Saudi Arabia|24.96|46.70
JED|Jeddah|King Abdulaziz International|Saudi Arabia|21.68|39.16
CMB|Colombo|Bandaranaike International|Sri Lanka|7.18|79.88
MLE|Malé|Velana International|Maldives|4.19|73.53
KTM|Kathmandu|Tribhuvan International|Nepal|27.70|85.36
DAC|Dhaka|Hazrat Shahjalal International|Bangladesh|23.84|90.40
SIN|Singapore|Changi Airport|Singapore|1.36|103.99
KUL|Kuala Lumpur|Kuala Lumpur International|Malaysia|2.75|101.71
BKK|Bangkok|Suvarnabhumi Airport|Thailand|13.69|100.75
CGK|Jakarta|Soekarno-Hatta International|Indonesia|-6.13|106.66
DPS|Bali|Ngurah Rai International|Indonesia|-8.75|115.17
HKG|Hong Kong|Hong Kong International|Hong Kong|22.31|113.91
PEK|Beijing|Beijing Capital International|China|40.08|116.58
PVG|Shanghai|Pudong International|China|31.14|121.81
NRT|Tokyo|Narita International|Japan|35.77|140.39
ICN|Seoul|Incheon International|South Korea|37.46|126.44
SYD|Sydney|Kingsford Smith Airport|Australia|-33.95|151.18
MEL|Melbourne|Melbourne Airport|Australia|-37.67|144.84
LHR|London|Heathrow Airport|United Kingdom|51.47|-0.45
CDG|Paris|Charles de Gaulle Airport|France|49.01|2.55
FRA|Frankfurt|Frankfurt Airport|Germany|50.03|8.56
AMS|Amsterdam|Schiphol Airport|Netherlands|52.31|4.76
ZRH|Zurich|Zurich Airport|Switzerland|47.46|8.55
FCO|Rome|Fiumicino Airport|Italy|41.80|12.25
IST|Istanbul|Istanbul Airport|Türkiye|41.26|28.74
CAI|Cairo|Cairo International|Egypt|30.12|31.41
NBO|Nairobi|Jomo Kenyatta International|Kenya|1.32|36.93
JNB|Johannesburg|O. R. Tambo International|South Africa|-26.14|28.24
JFK|New York|John F. Kennedy International|USA|40.64|-73.78
ORD|Chicago|O'Hare International|USA|41.98|-87.90
SFO|San Francisco|San Francisco International|USA|37.62|-122.38
LAX|Los Angeles|Los Angeles International|USA|33.94|-118.41
YYZ|Toronto|Pearson International|Canada|43.68|-79.63`.split('\n').map(l=>{const[code,city,name,country,la,lo]=l.split('|');return{code,city,name,country,lat:+la,lon:+lo}}),AP=Object.fromEntries(APL.map(a=>[a.code,a]));

const rad=Math.PI/180,km=(a,b)=>{const A=AP[a],B=AP[b],h=Math.sin((B.lat-A.lat)*rad/2)**2+Math.cos(A.lat*rad)*Math.cos(B.lat*rad)*Math.sin((B.lon-A.lon)*rad/2)**2;return Math.round(12742*Math.asin(Math.sqrt(h)))};

const SKY=[['☀️','Sunny'],['⛅','Partly cloudy'],['🌧️','Light rain'],['⛈️','Thunderstorms'],['🌫️','Hazy']];
const MENU=[['🍛','Veg biryani',250],['🌯','Paneer wrap',180],['🥪','Chicken sandwich',220],['🍎','Fruit bowl',150],['☕','Coffee or tea',80],['🧒','Kids meal',160]];
const PROMO={FLY10:.10,STUDENT15:.15};

const CAB={eco:{n:'Economy',m:1,lv:0,pk:['💺 Standard seat','🧳 Cabin bag'],rows:[15,22],lay:'ABC DEF'},
 prem:{n:'Premium Economy',m:1.35,lv:1,pk:['🦵 Extra Legroom','🧳 Extra Baggage','🍲 Premium Meals'],rows:[7,10],lay:'ABC DEF'},
 biz:{n:'Business Class',m:2.4,lv:2,pk:['🛋️ Luxury Lounges','😴 Cabin Comfort','🍽️ Premium Dining'],rows:[3,6],lay:'AB CD'},
 first:{n:'First Class',m:3.8,lv:3,pk:['🚪 Private Suites','🥂 Fine Dining','🎖️ Highly Personalised Service'],rows:[1,2],lay:'A B'}};
