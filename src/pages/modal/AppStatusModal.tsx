import { useState, useEffect } from 'react';
import img from '../../assets/default_profile.jpg';

interface IParticipant {
  id: number;
  name: string;
  profilePic: string;
  applyDate: string;
  dob: string;
  gender: string;
  eventName: string;
}

const AppStatusModal = () => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);

  useEffect(() => {
    const fetchedParticipants: IParticipant[] = [
      {
        id: 1,
        name: '백종원',
        profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGUGAXoxnSK62oS-qsHuTN9Ii9vYRBkd8LFg&s',
        applyDate: '2024-05-01',
        dob: '1966-09-04',
        gender: '남성',
        eventName: '요리 모임',
      },
      {
        id: 2,
        name: '고든 램지',
        profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfS36I7ztmDxD-kyAom5UNpbGIibvxNYc8aQ&s',
        applyDate: '2024-05-02',
        dob: '1966-11-08',
        gender: '남성',
        eventName: '요리 모임',
      },
      {
        id: 3,
        name: '이연복',
        profilePic:
          'data:image/jpeg;base64,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',
        applyDate: '2024-05-03',
        dob: '1959-07-11',
        gender: '남성',
        eventName: '요리 모임',
      },
      {
        id: 4,
        name: '요리왕 비룡',
        profilePic:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhMVFhUXGBgXFxgVFxUYFRcYFhUWFhgWGBcYHSggGBolHRUWITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy8lHiUtLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTctLf/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAQIDBQYAB//EAEMQAAIABAMECAMFBgYBBQEAAAECAAMEERIhMQVBUWEGEyIycYGRoUJSsRRicoLBI5Ky0eHwM0NTosLSJBZzo7PxB//EABoBAAIDAQEAAAAAAAAAAAAAAAIDAQQFAAb/xAAqEQACAgEEAQMCBwEAAAAAAAAAAQIDEQQSITETBUFRIjIUQmFxgZGhI//aAAwDAQACEQMRAD8AObZXZHgPpFdU7IPCNpLQFR4D6RHMpQYuQ1OFhlWel5yjzqo2aRFfMpGEekz9nA7oqqrZEOU4SFONkTCFbQlo0dXsnlFTUURWIdfwcrPkBtHWh7IRDSIDA1PI0rDcEPhDE4OGFYYytutEwz0zhyyidT6f1hsKJS6RDmkCdU3H2hQvGCjLXf7mOwJwEOjpGgHagUW4keI/lD8BHPwifqV//Cf0hvUW7pI9xB/hflEeUiVSdBEqULchEq3138oUzjvNvAE/SM3Waa+vmHK/01vT56Wziz7v8ETZ3FvaHjZ68T7Qy673Pp/SOxyx8bf35RlN3/r/AEbkatH8R/scdnr8x9oa2z+De0PWem57+hiQTeFjC3bdH3Y78LpJL7V/AJ9hYcDEUyUy6g/pFks08PqYQ1FtRBx1di75E2elaeSysoq4S0WLoj8jx0gWdIK8xxi5Xqoz4fDMnUemWVrdHlEFo60OELaLRmtDLRxEOhDHAjI6FtCRxwkJaHQkQcNhY6EjjjjHR0dHHHucjujwH0iQCI5J7I8BEoMVC2cRETyQYmjolPBDjkr51HfdFbV7JB3RoiIY0sQ2NzQmdCZhazYnKKap2YRuMemTaYGK+qoARnFmF6fZWlRKP2nmc6SV1iPD83pGhfZrVLl0ylDJWPxW1Kj9YqK+QisVB01P6XizXtfK5A3PpgmM6KIcJN9ST52EQvUjuoLn2jqeUzkY2wrvt/SLCsWcLl/4Q4/wWdPTy74ReY/yy7AebEG/kPOCK6mVFzVUbcoZ3f8AMcWEekG08zqJYEmXZpncFruR87HnuEJR7ExN+2mDEe0VBu/ieEH5McyF7c9FDDUcHSLWoozVTerkqFkSzYtuZt5J+KBqxVLiRToWK5M28tofIREdSmwnXgFjodtBRKOEkEjW3HhBFVRlElE6uuI8s8h6Wh3kjnAG19gsdaCdqUvVMF34VPmf6xoKjZAAmAAC6ph07y3uPP8AWBldBEqLZkpssEWMV8+W6HIm0bOj2cJ9MAMnQsPe9j6xRtJsxVwRbI5ZjyMJtpruWMcja7p18plTI2iw1iwkV4bWOquj5ydWHVto9jhHJ96ekVdZRTZLYZilTu4EcVIyI8Iw79Ek8G1pvU7I9vKLaZLGqw1ZpHPxgOjqtx1gp2BjNlW4vDNyu+Nkd0RsxBqum8cIZEkQNkeUXNPf+WRl67SJ/wDSH8jjCR0LF4xmhphLQ/DHYY4gjtCWiXDCYY4giIhIlKw3DuiG0EkyMwloeRCWiMk7T3GRoPAfSJQIjkDsr4CJIrFkUQt4SBNpTyqWXvt2VHM7/ADMwLYSO+3EnsLcfMWwg+FgSfSEmV7KCzIoA3iZ/wBlA94DlVGQWSmILYYicKZZd7VvIHxhjFA150xSw7qDIL4Jcljz+kL3D/Ggpa+Y+aS8I4zcj5IpNx4kQjVVuzP6vC2QbNVORurBibZc84b1zt3FKj5nFvRO8fO0RT5SICznE1jm1svAaKI7c0T4U+Cu6T7YlSpOCUyFiMIwEHCo1NhplkIxGyNkzax7LlLHeY6D+bRJtpjUVPVyzfRQdwGpPgLmNlRbQSlkGWVVcCXTDo7bwb54rkGLMbmoqK7ZUnp8NyXSM1tillSLSJQzHfO/wPOKkzVUqGyBIHgL5mOrKm12Y3Zjc8ycyYr5Xau76D3jYjLxRUF2Z23c8vo0m1ekVzaRZEAw47dtgNy30EG9FZeKnmuWwl2IxbwFAzJO/Mxhp84sfpBz7SmLIFMpspOJraknd4RUc85wN2Glotph58unphhlIG/OQptc8L584dT1MqkSaq2aYiXZ95djhCjleM3S1JpxiXvkH3BH0ME9H9ltOJdyervn98jO3hEWzVK57DqqdssIqesaY+Jjc3ufMx6NW04m9SVzCOAfDK/0EYHCBNmZWAci3AYjGu6N7TGIy2NsVivjaxHnaLFKbq3rsTbxPaO6X02IJNXPCyq1s8sY+hgHbG1maY1MGKsKhcJG5bBvZjEcvb32ernS3zlNMufukgdocuMV7zlatMwEFeuWzDMEHIWipKTa/YbXFbkmbDYc1GLlTZj/AIicHGRK8jFTVVUl5rSan9nMU9mZkFdT3b8DbjDtrULKeulXxDNra+IjMba2g0/D1ijrFyxjIMv3hxHEekFG/MVOL59w7dO4TcWuDXbPpJtO1xaZJbvYbHLjbf5Xgus6plamwIWAxJLmaOv3G1HDLThHn1LXT6drI7JvtfsnnbQ+MWk/pCKhAs4YJqG8ual7BvvDUX5R07/IuRapcWBVlCjXanxAr35L/wCIltSp+NR6jfDKWdiHOB6+vM1xMthewxFTbEwyx8ja0QyJxDX46xSugpLgv6S51z56LQNHMt4gLWYc4mLWijho3VJPOSJeESqIYwzvEqrGlRPdEwNZV47MLoW0LC2jRdFJlOgabOw4jMEuWSL2OEE8l11PCDnYorJXrqlN4RW7E2M9UTgICjvOcwOQA1MaJuhSAgh2cDvISFxZfCwHZ/vONIqy5mejDQjJh5/ppDrTBoVfx7DeoBBPkIqSulLovR00Y9orJWxaKYuASEBGoK4Zq+J73ncgwRS0P2fuS0ZfuKiTfYBX9j4wQ2CacDoVcZi+TeKOp+h8YbOaZKF8WNRqGsH/ACsLA+BGfGF7h2xfABtrZEmslnBhE0aNazg/K41z4GPNZ8goxRhZgbEHjHrk9Zb2YmxtkwyceYz8ooa3Zkuc2OYoLaXFxcDQm2+Dha4gS0281kg9lfAfSJYhp+6vgImEGVhYAqpY61Sd6MAN2TKT6g+0HQFtZsKCZ/pkMfw91vYn0iGHDscJYtYZDTLK3hCU9OqAKosP7zJ3mJBCwstAKda5JvgW5AGG7mxIxXJsL7sjlA9RSy1ILXdtRjNx44e77RaRX7TXQwMuhla5MzLkrJmzp80gF27PG1r2A4/yit2ttRJqKoIvjvbO4UA2vffeDelY7Ms/eP8ACYylQ1jfkR9IPTteVZB1MMUy2j6CjaqqElDQnM/KozZvSBNozFxEILKCbDlfL2iWiJUMw1taADFrzOU5GbKjZCLEETU5u9z4xDFg9MFplmC2JphU8QMJy/X0glbtabB8e5MGuJkwAsFBNrnQDjG/2bNk4Qkp1YKLWBBMYei2TMmoZgKBQbXY2z5ZRPKUpcBGbB3mQEgHmR3T42gXGN8nulhjq7JURyohG0aS1U6aY2Uj8xH6xDOBtcXDLmOIIP8AMRHVVhmYXx4iotn3rHnqfOLapRZy9dKIJt+0QaqbZm0XKbVViuT4fBXsr8uZxXPZndo1ZnTDMYAMbXtpcKBfztEsiSepLjc1jyIAIP19IgqpVj4xZbC2hKlpNScCVYCwAvc5jy3RWsbhLgOpRl2bPZtWJstXG8Z8jvEZvpRQyiSUYCZvUZg/9TFLR7TeXdFZhLJvbf6j9ILkO0xsElHmOfhUH1MDp6ItuU5YQ+/UtxUVHLK2ZVHB1bKCVPZY95RvXmIFi1kULTZjq8uaHTvKgXEo33QkMfK/hFxsno/TzEuSzE3swJAt9LjQg58oXZOMW8dAV1ysMlHRZ7Z2K9Oc80OjD6HgYrQImMk+gJwcHhhYa4UxNUNaA5bZWiWc94rSjyaVVuYBYNxBySEABZvew9oqpTWUxGFJ3EwpqXSeC1GyHEpRyy6+0SV+X0hPt8v+xFWtMd9hEnVKuuZgPHH5HrUWe0UkXdFt4yyAputxkd2e7hG6l1rAcfGPLKKXjmovFlHuI9LEHjaV93keWiWonF7YgOybjkeI5w0sTqYaIWBCSSOtDWmhcibQ6MRtfaBeaxViFGQ8o4k9Up+6PARLEUkdkeAiW0WzFFJjOdL6vsCTfvZt+HcPM/SNGY8723VF5kx+dl8Bl/OE2y2ouaKrfZz0jV9HqzrZCk95ew3iuX8j5xZxjOg9VhmTJR+IBx4jJv09I2cdF5QyxYk0JaA9pL2fODYD2kez5xLOh2ZDpdLvJHJx7giMVPUjWPSa2lWbglsSAzqDhtfecrg8ICrOhLZ9VNVhwmKVP7y3B9BAxbXR1uxvEngwcpiBlA5WNTU9GqmX/kuRxSzj0W59hFJtGldDd1K/iUqfQw2uf1coRdWnDh5wAlMrxcz9iVEqWyTFsGUTFzBF0zI5NhJNuUBUdOzggAnQmwJsOJtoOcehT6wlnVu2qzApUC5XVicvh6si9796OnPkXGtNJldTbIf7BLWUt3crnldQ7Zv5AxZ7VnJs95KrTmZKEtguG2IOCO0b5EkfrFzJwy1C8MgACT5AZwyodJ6YGw8RiF9MsSlWB8wfGBy8fqHOG5r4POqbZUyoqA3VmV17M0vIGVhCsxDAZ6qAeF9IupHRp6abjViy2zA4bwePLTSNXQUglgWYsM8OpAB1tcn6wRPJCkgXNshxO6O5wTCCiYnpD0SLL1kjtb8HEHO6/wAoyezUVZ6rOTK9mVha18swY9jppWFFX5VA9BaAtq7EkVItNTPcwyYeY/WGeR4wwHUs5RT/APpqnmSyqoqnkLeGYziCdQztnSpRphLJKsJrOpILnCQQQRbeM+EaPZ9AZShS5cjLEQASN2K2RPPKJ1qA11U3G8gAr4Zgg+8K5GzjGWODEdH9k1LVMqrm4GaZNuxBbGtlcOCmSlSLC+eoi8rNndXVTHQKst1UlR/qC4JtuuLRZy2SWSFJW5scCS1F8JaxKIDoDA1XbEO1csMWe8HeOIjpP6cEU1pTygOpp1mKVYAg7jHmNZTYJryxc2YqOJsbCPVIwqWFW8w2UY3ws2lwbEi+pHCIqltG6mG7BAnRepwY7KMr4Se16WtfzisKm9rZ6RtapZ0i04TWmpcYr8CdwHZtnqAD4xSbckBamYdxwnzIziXPJEaUuEV8tLWEEaRGEOt7eUL1I3knz/lBLTTl2T+OqrWFyRzJ/CI1lM3LxgpJYGgEPEWIaVLspXeoSn0HdFaANUoN4DMPyr/WNuVjC7LrjInJNAvhOY4qRYj++EejpgnoJksggjIj9ecJvrw+B2jvysSYFC2iU0zj4TDWlMNVPoYr4ZoKSKvb1T1cliNT2R4n+l4xeCPQp9MrjC6hhwMVszo7IJuMQ5Bjb3vA4YaaNZKrpeEZ3yHcDPu+6DHfbuEuY3kq/wAbAw2QOyPARKBFnLMvxIjNTMOktR+JzceQUg+sUEnomLDrJrH8ChfXFijSAQsBJJ9jq24Z2lfQ7FkSrFEGIfE2bc8zp5RYGIKiqC6ZmK2bPZtTEZSGqDlyyzmVKrvitqJ2I3gZ5oBA1Y6KASx8AINpNlM9jN7I+RTmfxMPoPWIWZHSlCvsh2ZJ6yZj1SXcA8XIt7An1i8CxJLQAAAAAaAZAeULaHRjhGfZNzlkjhHTECpzByIOhESEQsFgAz2yujopp7tKI6matmRibqwNxbiubDPTnHNTYWw4btZhuBmIyquIE5FwFUEX3RoDENTIVxZhzG4g8QRoYCUc9BQltYFRuHlqSNVAIOtxkQfMGJPs655a621PK8QykaW5VmxBziQ2sb27StuJ33Fr55QXAlpPKyMSUBe2+3sLCOnYsJwgE7gdIfEM6oCkAhiT8qsw8yBYeccSCDaROkly17FRhuCNRckD3g+W9wDYjkdRyMQiqO6XMPkg/iYQ37S3+lM/+L9JkcSwoiEC8MvCB5NWGbDhmKbX7SMB+9pfleCY4gH+zAKBnkQ199wbm/jn6xWTFW+WguF5A7hyg/aFSFFrgeMVX2gcG/ce3ra0C030NrxHljyvOKXbKy0lomQbEMN9de0ed/cmDa7asuWjPiU2+HEATnuHGKCp6UScReVKLTCAMT28hkSbeECoSYc7YJcsudnHqpN5mQuSoOtjoLceUZmtls8xpjXGI3A4AZD6QXK6RBZjCdLxEHIm6lctAhFgfQ56xbSJlPP7jAMfhbJvLc3kTF/S0RxukZGs1kn9MOjL2hIv6vZBGgiqnUbDdF11/BnK1PsGjrwpQiEgHEYpCiLHZG15tMbyzdSbsjd08x8p5iK4Q4QEop8MOM3F5R6RsnpDIn2AbA5+B8j5HRvKLePHXzIHnGi2R0pmyezMvMTme2PA7/P1jOtahLBsaeE7a95vnkqdREJoV4mGbN2pKnrilsDxGjDxEGxAeZIElTQFFyNB9IY1cu7OKmR3R4CJIByeR0a1jkMeubcLRA09jqYFacxBKIX/AA2t6nXyuYo9pbRcl1DWsbZBlNuYYBh6CBluSyw69kpbY4yW9ZtOXL7zC/AZn0igrdvzGNkAQcdW/kIqjvjpY3wGRuxF70PJNYhNycMy5OZPZ4x6KIxnQOgOJqgjK2BOdz2j7ARtIs1Lgy9U058HQsJDHnKNWA8SBDCsPjojE9NzL6iH3jjhYgWYX7gyBtia+HLgNW9hziYGIdnTMN5JyK937yE3BHhofDnHEAW1EQAK7sznNcJIII+JUTXzvEVNWMBaapG4NlY8yAThPjBO0ZeCYX+F7AngwFgPAgevjERI3w9VRlEWrpQYVeOjNPtNpb/srFPlN8P5T8P05RaUW2Jczs3wv8rW9joYTZTKHLLld8Z8LsKqUmZdWyDjiUtfwswt7wtMswD9oVJ+6pUehYxNCEwkeLEU+cFED1e0FUajxOkUlRtdN13PLT97SBchkK89l7smWJju7AHDYC4vYkEkjnYiGbTqQhIWwsATe9gCbDIZkk6ARF0UqGZJzMAO2LAaZS137znAsx8VQBwJJ54EFveePSLdC4M3Vv62SGtbfmOcucg9SpgRzJe2OTJc3v2GlOwO42cI1/C5i5BhHUEWIBHA5xZ2lLJlNqdGaaaHaUTLmAFiCWHO7I+YHMRh5FQVyOa/3mI3/TWUq0xwnCcS2AJAI0ICjL23R50EJ0BgN2yXAyMXNYN30c2zjKyppxBskc6g7lbjwvF9U7LB3R5lQl0N7HcRyINwY9EfppI/0pxPhLH/ACiZ6mCw0yY6GyXG0rqvY/CKmfs4rF7M6Wyz/kN5ssWUikecmMScAIv+0YDLj2QbDxt4QdeqhPsTZo7au0YRpJEMtGvfYkx81lNb5sgp5jFYkc7QDUdG5w0l38GT9WEMex9MWty7RnFHaiS0WB2BUhspLWNt6Zf7o0+yOh0lwRMmTGYWvgARVJ3AsDcxkX1Sc2z0Wl1NVdKTfJiqeayEMrFWGhBsRGlpOmUxVAeWrn5r4b+IA1gyu6AuM5E0Nym5H95RY+gix2R0OpzKUzVYzM8fayDAkEC27KFeOY6Wool2B02NlXCptYZnIabr5mCZFMuLtHGRruUHhbf53gOftW6hZRvkO2NNPh4xa0skIgUefM7zGrDTxismLZq5z4Kys2qyzcK2wqVBFsze1892sWVVQy5otMQN9R4EZiM/OW89l4zV9yv6RrqeTiMNkljkRFyzwZ+b0UkHQzF8Gv8AxAxE3QtW7kx93eCkc9AI2sulUc4nCiKko1/BbjbavzMrabZ4loqXY2FgE7Ki3AX+pMOSmnX74VfvAM/kVsq+jQVKzmOeAVfbEf4h6RPA4RzYMKJfiu/48x+73R5CHlVQZADwAH0ieAp08ANNbupe35dT+kQ+Eck28Ir9tbRSQA7ANNN+rX5d177vGMbM2hNZi/WOC2ZwsyjhopAhK+sadMaY+p0HAblgYmM225yfHR6XR6GNcMyWWwxdq1A0nP5m/wDFeOmbZqLAmaSVzU4UuCOYW+cBxJTJimIvF0Hq4EBGyWex9mmpUW9qPQJcwuhSeoDFbsB3WG8rfMWJGW6M3WMxlshJJlsAeakXVv73gxop8hpkwvcBVuijncYyfNbflirpZdy7n4jb8qEqPoT5xu0PGDxl/LM0WsLw2ke7y8u+CGGvZKls/MD1iw2vspgrYMwQct4uDEmxaIYVZc2ZQcR1tbTkILV2pRx8haKlysz8Csk1R+ymMo4XBHgAwIEAVNRP0eY/sv8ACBF7NkMuohaKk65ipawUAmwBPaJAAvcDundGUsvg25OEVuMrgzuczxNyfUw6Nq2wKVc3XzZ2UexAhBR0AtlJPi4P1bOD8MhH4yK9gXo3KK0zN87lh4AKl/PCYG2Z2pjv6H8TE/wLKg7a+1ZYllZZHygr3V3a6ADWKqVXpJS2ElmNwo3CwChidLKqiL1MccGTfPdLJckxTbR2+q3EpcbaXvZAeF955CBJrTajvHCm9VuF8zqx9PCJptPLpZRnOLtkEQ6AnTLjvPC0Pk1FZYqMXJ4Rl+kFdMdbO12OZtkANbARU0kzdBdU5fEzG7NmTA1HK3xmW278s26NM6nFBQESS5ZOkOkSS3hFhJkaKouSQAOJOkUm+TZhVlZfRZ9E9hCdNxOLpLszcCfhX2vG/YBzh+EHPmR8PgN8CUFIKeWklO82bHn8TeWQHlFlKlhQANBGhVDbHk8/qrlbZldew+0NaWDuEKzAaxX1dcbhJYu7acOZPIQ5JlN4Fqgpbq5YGMi5O5BxP6CDqaQJahV/qTvJiKhpRLW2rHNmOrE74Jjss5IWB6WYFLqfnJHgyq36mJ4ptr4g+W8A/UfpEBGP2bLuUH4fQCNQYrdnUyykDMQDYXJ0EBbUr+sGBLhPiOhbkOAjRlzjBS6Oo7TatnXujPxwrgv6k+ka/ZqamM/sCmwre1r2A8Bp+saunSwivbwsDq1nkljo6OisWAWS1prr8wVx6YG9MK/vQVAG0zgwTfkazfgeyt5A4W/LB9o44jqJuFWbgCfQXjPdLJxSmSVvcqD4KMTe9vWLzaH+GRxsPVgP1jLdOZl5kteCs37zW/4Qi+WIMuaGG++KZmTDTCmEjKPXCgxNRn9rL/8Acl//AGLEIhZfeX8S/wAQgo/chV32P9jfbQqPs13FsBLMysSLGzTGKtnrZjhI8xFfs6upao3ppoWYcyhyueJln6r6mLXbVMswy5bi6s7qw4qaeeD9Y8v250VmSapZUsMUdh1T5m1zvIGRGvhGvBtM8VJcnoM5mlm01cPBgbyz+b4TyYDzgLZVkmvLOVjdb/K/aHobjyjPV9ftWhQpNwzZenWMOsWxytiyP7wgHo/taa7oZlyuIqHtYDHngvpkVFhuzibZOUeSdO9s+Pc9IIBiHZIXrZ2EjSUCAd4xk/xCK6dtB1Q4VLPYhAuZLWyFt8eb1myKsEzJkiaCTcsUYZk8bcYVWk3ktahuK2npFfOMyqK5gKCLgZ9jDiCk6XaZYn7kB7arZFMmKZiJPdXG7EnwZo84+xVXeWXPzzuFmb+YED1XW3tN6zEBpMxXA8GztFpSwjOayzWUPS6W01Q1OiqSAGBu63yzNtI3Akr8o9BHjtBRTZrBZSsxuMwDYcyd0eryUdJSS8WKYQFxNvNu03lmYZXJ4AnFBMlAzXyCrkBxbefLT1jG9J9pddNwg9iXdRzPxH9PKNF0jreokYUyZuyvEcT6e5jGSqY78op6u7H0mr6XpXN78EFrxPIpuMEy5IESiMx2HpIafnLOVbRpOhdFimtObuyxYfiO/wAhf1EZy8byipxJolXQuq4jvxTmVfbH7Q3TQ3Tyyt6nd46tq9y0oe1eYfi7vJd3rr5w+dVBfGA6qtAGRsBGdr9rHRL20vvJO4c42a6s8s8nO3HCLbaG0wCBmzE2VF1JP0iz2XRlAWe3WNrbQDco5D3gLo/sbq/2s3Oa3+wcBz4mLuBnL2XRMIvtix0dEE2otkMzAJZDzgngSslEtcC+X6mCJSkDPWHxBx5pKRpuEnExsLXztlw0EXFJsoDN8+W6DaKSqIoUWyH0icRf38cFTacgtpFlRVF8jrFeIcDCprIyLwXQjoCparcfWDLxXawPTTGzZYZSp0IIPgRYwFsmeSuBz20OBueHRvMWPnB8VG0FKTlmDSYMJ/Gouvqtx+URCObwHbQP7Njwsf3SD+kY/pm3/k24S1/imRqaifikv82BvZTGT6Yn/wAk80U/UfpFXVJqJp+lYd6KMw2FhIzD1AsPp1u6DeXQerqIZFn0akY6mXwUlz+QZf7isHBZkhGpltqk/wBDdTBeav3VZvMkKPYvBN4Hkm7ueGFfQYv+cTxsI8Yyv25T45Di17DEBxwdq3na3nAVcgm0a2ALEIUAt/igi1vzA+V4tNpsRKe2pUqPFuyo9SIrtmqD1A3BZs0fmeyf7ZjQEuyVxyT0VAskY3N347hf4VH9kwLMpnqm7RwyQdN7EcYnnsXfCD8ZReQCgzH8bEqPLjFpLQKAALACwiYpLomUnLsH+wra2cVG1+i8qot1qhiNCCVYcrjURoY6G7hW1FDs/YiyFwSpYUcsyTxJ1ME0dGGZnbddF4fePqAPymLKc1hfyHichFbtaqFNTkrrbCvNm3+5MdOzCJrq3SSRjOkE4PUNwTsL5d73v6RXwsJGJZNyllntNNSqq1FHRwjoEnTSreMCuR8morLCpguCPL1j0XpC2GWl9Otl35BTi+qj1jzGdVWUkcD9I9A6SVOOnXiXQ8rZm/0jQ0MeTz/rU09uClr60vyUf3cxb9FtkliKiYMv8pT/ABkfSA9g7I689ZMFpI0B/wAwjf8AhHvGterUae2kats8/TE87XD8zCYhmVKiAZlSzcvCI0W5tClX8jHP4CXqGbIQTTyMOZ1iGW6pzMRTKpjyETj2RGfkNm1CjfA5rjuEATp6rmzAeJhUYEXGhglWQ5kEnujwH0h8dHQwB9jrx0dHRxAoME01VbI6QsdAtJhRbTDlYHOIK+n6yWyb9VPBhmp9QIWOiqx5UUs7EoOhIsRwOhHkbiKXpevakv8APKA/dJ/7x0dC9Ws1F30t41KM+YSOjox0ewFBjS9CJV3mv8qqo/MSx/gEdHQ/Tr60Z/qTxQy4qNsSaaW02c1gZky28sVcrkN+SiKyg/8A6DRzGwtjlcGmBQh/MrG3naOjo02eUJtr9JqQy+xUyiQQcnBPZBZdPvBYSl29RrMP/kyQqypSLd1AyabcC/ILfyjo6BZI2h23SmeD9ok2/bn/ABEAu0yUF1O8KbRoJVdKbuzJbfhdT9DHR0FEhg9dtumkkCbPlITuZ1Del7wXS1KTFDy3V1OjKQQfMR0dEkEc83mIv4nP5bAe7X/LGX6b1V3lyhuBc+JOEfQ+sJHQjUv6GXfTop6iOTNQkdHRlnrkdA1el1vvEJHRMezprMWCIbiPQJJEykkFu0CJGK9881Bjo6NPRv6meY9U5hFlx1hOW4aAaCG3hY6NIwzrwoMdHRwJX1W2ZSHCCXbgmdvE6DzMVdRtOe+lpa8u03roPeOjodGKBbCdlbND/tHJbP4iTF8Fjo6AsJif/9k=',
        applyDate: '2024-05-01',
        dob: '1990-01-01',
        gender: '남성',
        eventName: '요리 모임',
      },
      {
        id: 5,
        name: '요리킹조리킹',
        profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpaYkGYzUu9kywlru6zxpdr5dUErCJZ-UQKQ&s',
        applyDate: '2024-05-01',
        dob: '2003-01-27',
        gender: '남성',
        eventName: '요리 모임',
      },
      {
        id: 5,
        name: '먹보',
        profilePic: img,
        applyDate: '2024-05-01',
        dob: '1998-03-03',
        gender: '남성',
        eventName: '요리 모임',
      },
    ];

    setParticipants(fetchedParticipants);
  }, []);
  // 참가자 수락
  const handleAccept = (id: number): void => {
    setParticipants((prev) => prev.filter((participant) => participant.id !== id));
  };

  // 참가자 거절
  const handleReject = (id: number): void => {
    setParticipants((prev) => prev.filter((participant) => participant.id !== id));
  };

  return (
    <div className="p-4">
      <ul className="space-y-7">
        {participants.map((participant) => (
          <li key={participant.id} className="flex bg-brand_4 items-center shadow-md p-5 rounded-lg relative">
            <img src={participant.profilePic} alt="profile" className="w-24 h-24 mr-2.5 object-cover rounded-full" />
            <div className="flex-grow">
              <div className="font-medium text-lg">
                <strong>{participant.name}</strong>님이 {participant.eventName}에 참여를 신청했습니다.
              </div>
              <div>신청일자: {participant.applyDate}</div>
              <div>생년월일: {participant.dob}</div>
              <div>성별: {participant.gender}</div>
            </div>
            <div className="absolute right-0 mr-5 bottom-5">
              <button
                onClick={() => handleAccept(participant.id)}
                className="bg-green-400 hover:bg-green-500 text-white font-bold py-1 px-4 rounded focus:outline-none"
              >
                수락
              </button>
              <button
                onClick={() => handleReject(participant.id)}
                className="bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-4 rounded focus:outline-none ml-2"
              >
                거절
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppStatusModal;
