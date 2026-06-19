# Notatka UX

## Kontekst aplikacji

Nitro Academy Logbook to aplikacja do szybkiego zapisywania przejazdów samochodami, śledzenia dystansu, kosztów paliwa oraz porównywania aktywności kierowców i aut. Interfejs jest zbudowany wokół częstego, powtarzalnego zadania: wybrania auta, ustawienia trasy lub dystansu i zapisania przejazdu z konkretną datą.

## Grupa docelowa i persona

Główną grupą docelową są osoby korzystające wspólnie z kilku samochodów, np. studenci, członkowie koła motoryzacyjnego, znajomi organizujący przejazdy albo mały zespół, który chce rozliczać dystanse i koszty paliwa bez arkuszy kalkulacyjnych.

Przykładowa persona: **Michał, 22 lata, student i uczestnik Nitro Academy**. Michał często korzysta z różnych aut wraz ze znajomymi. Po przejeździe chce w kilkanaście sekund dopisać wpis, sprawdzić kto ostatnio jeździł najwięcej i oszacować koszt trasy. Nie chce pamiętać wzorów na koszt paliwa ani ręcznie porównywać historii przejazdów. Korzysta głównie z telefonu, często zaraz po zakończeniu trasy, więc interfejs musi być szybki, czytelny i odporny na błędne dane.

## Kluczowe wybory UI/UX

Najważniejszą decyzją projektową jest umieszczenie ekranu „Garaż” jako głównego punktu pracy. Użytkownik od razu widzi wybrane auto, kierowcę, dystans, datę oraz przycisk dodania przejazdu. Ogranicza to liczbę kroków i wspiera najczęstszy scenariusz: szybkie zapisanie kolejnego wpisu.

Wybór auta przez strzałki, kropki nawigacyjne i skróty klawiaturowe odpowiada modelowi karuzeli. To rozwiązanie jest zrozumiałe wizualnie i pasuje do aplikacji, w której samochód jest centralnym obiektem. Duże zdjęcie auta wzmacnia rozpoznawalność wyboru i zmniejsza ryzyko zapisania przejazdu dla niewłaściwego pojazdu.

Panel dystansu łączy trzy tryby pracy: zapisaną trasę, szybkie wartości oraz ręczne wpisanie kilometrów. Dzięki temu aplikacja obsługuje zarówno powtarzalne przejazdy, jak i sytuacje jednorazowe. Komunikaty toast po ustawieniu dystansu, dodaniu trasy lub zapisaniu przejazdu dają natychmiastowe potwierdzenie bez przenoszenia użytkownika na inny ekran.

Historia przejazdów jest pokazana w formie tabeli, ponieważ dane mają charakter porównawczy: data, auto, kierowca, dystans i koszt. Wartości liczbowe są wyrównane do prawej i zapisane krojem monospace, co poprawia skanowanie. W widoku głównym pokazano tylko ostatnie wpisy, a pełna historia jest dostępna osobno, więc pulpit nie jest przeciążony.

Statystyki i rankingi wykorzystują kafle z dużymi liczbami, ponieważ użytkownik najczęściej potrzebuje odpowiedzi na pytania „ile?”, „kto prowadzi?” i „jaki jest koszt?”. Ustawienia paliwa oraz tras są oddzielone od głównego przepływu dodawania przejazdu, co zapobiega mieszaniu konfiguracji z codziennym użyciem.

## Odniesienie do heurystyk Nielsena i zasad UCD

Projekt wspiera heurystykę **widoczności statusu systemu**: stany ładowania, animacje zapisu, nieaktywne przyciski i komunikaty toast informują użytkownika, co dzieje się po akcji. Dotyczy to m.in. zapisywania przejazdu, usuwania wpisu i wczytywania statystyk.

Heurystyka **dopasowania do świata rzeczywistego** jest widoczna w języku domenowym: auto, kierowca, trasa, dystans, spalanie, paliwo i koszt. Aplikacja nie wymaga od użytkownika znajomości technicznych struktur danych. Koszt paliwa jest opisany prostym wzorem w panelu paliwa, więc obliczenia są transparentne.

Heurystyka **zapobiegania błędom** pojawia się w walidacji formularzy. Dystans i spalanie muszą być większe od zera, nazwy tras i aut mają minimalną długość, a formularz kierowcy sprawdza format pseudonimu. Przyciski są blokowane w czasie zapisu, co ogranicza ryzyko podwójnych wpisów.

Heurystyka **rozpoznawania zamiast przypominania** jest realizowana przez zapisane trasy, szybkie dystanse, listę aut, zdjęcia pojazdów i historię ostatnich przejazdów. Użytkownik nie musi pamiętać poprzednich wartości ani ręcznie odtwarzać kontekstu.

Z perspektywy UCD projekt zaczyna się od podstawowego zadania użytkownika, a nie od struktury bazy danych. Najpierw eksponuje szybkie dodanie przejazdu, później podsumowania, a dopiero osobno ustawienia. Taki układ odpowiada obserwacji, że konfigurację trasy lub paliwa wykonuje się rzadziej niż samo dopisywanie przejazdów.

## Własne obserwacje i możliwe usprawnienia

Interfejs dobrze wspiera szybkie operacje, ale przy większej liczbie aut i kierowców karuzela może stać się mniej efektywna. W przyszłości warto rozważyć wyszukiwarkę lub listę wyboru auta dla większych zbiorów. Przy tabeli historii można też dodać filtrowanie po kierowcy, aucie i zakresie dat, aby użytkownik szybciej analizował starsze wpisy.

Drugim kierunkiem rozwoju jest lepsze wsparcie korekty błędów. Usuwanie wpisu już istnieje, ale edycja przejazdu byłaby zgodna z heurystyką kontroli i swobody użytkownika. Przy danych kosztowych szczególnie ważne jest, aby użytkownik mógł poprawić omyłkowo wybraną datę, trasę lub auto bez kasowania całego wpisu.
