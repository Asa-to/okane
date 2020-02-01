import java.util.*;

public class okane{
	/* クラス変数 */
	static int myMoney, syougaku, firstYear, firstMonth ;
	static boolean power_on = true;
	static Scanner sc = new Scanner(System.in);
	static int[] gakuhi = new int[4];


	private static void init(){
		System.out.println("現状の所持金を入力してください");
		myMoney = sc.nextInt();
		System.out.println("毎月入る奨学金の額を入力してください");
		syougaku = sc.nextInt();
		System.out.println("最後に奨学金が入金された年月をスペース区切りで入力してください");
		firstYear = sc.nextInt();
		firstMonth = sc.nextInt();
		for(int i = 1; i <= 4; i++){
			System.out.println(i+"年次の学費を入力してください");
			gakuhi[i - 1] = sc.nextInt();
		}
	}

	private static void printMyMoney(){
		int year = firstYear;
		int month = firstMonth;
		int money = myMoney;
		System.out.println(firstYear+"年"+month+"月:"+myMoney+"円");
		while(!(year == 2022 && month == 3)){
			if(month == 12){
				month = 1;
				year ++;
			}else{
				month ++;
			}
			money += syougaku;
			if(month == 4 || month == 9)money -= gakuhi[year - 2018] / 2;
			System.out.println(year+"年"+month+"月:"+money+"円");
		}
	}

	private static void printData(){
		System.out.println("現在の所持金:"+myMoney+"\n"+
				"毎月の奨学金:"+syougaku+"\n"+
				"最後に奨学金が入金された月:"+firstYear+"年"+firstMonth+"月");
		for(int i = 0; i < gakuhi.length; i ++){
			System.out.println(i+"年次の学費"+gakuhi[i]+"円");
		}
	}

	private static void endApp(){
		power_on = false;
	}

}

//	public static void main(String args[]){
//		init();	
//		while(power_on){
//			System.out.println("----------------------------------------------------");
//			System.out.println("機能を選択してください");
//			System.out.println("1:終了");
//			System.out.println("2:所持金推移");
//			System.out.println("3:データ修正");
//			System.out.println("4:データ確認");
//			System.out.println("----------------------------------------------------");
//			int select = sc.nextInt();
//			switch(select){
//				case 1:
//					endApp();
//					break;
//				case 2:
//					printMyMoney();
//					break;
//				case 3:
//					init();
//					break;
//				case 4:
//					printData();
//					break;
//			}
//		}
//	}

