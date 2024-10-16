# AudioPlayer 音乐播放

实现一个简单的音乐播放器，可以播放、暂停、停止音乐，并且可以调整音量。

<script setup>
  import '../styles/audio_player.css'
  import Progress from '../components/Progress.vue'
  import { AudioPlayer } from '@asteres/player'
  import { Icon } from '@iconify/vue';

  const player = new AudioPlayer();

  function formatSeconds(seconds) {
    const m = String(Math.floor(seconds / 60));
    const s = String(Math.floor(seconds % 60));
    return `${m.padStart(2, '0')}:${s.padStart(2, '0')}`;
  }

  function toggle(item) {
    player.load(item.src);
    player.play();
  }

  const musics = [{
    id: 1,
    name: '可能',
    collection : '可能',
    duration: 218,
    src: 'https://webfs.kugou.com/202410142342/6baf870c25b17dfb05adbf9cec2cad16/v3/38b234c1135a5e9a4c98d55c058a4894/yp/p_0_960111/ap1014_us0_mii0w1iw8z2ai2iphcu80ooo2ki81120_pi406_mx412819125_s1946986546.mp3',
    singer : '程响'
  }, {
    id: 2,
    name: '我的楼兰',
    collection : '倔强',
    duration: 325,
    src: 'https://webfs.kugou.com/202410142346/82d349c8914aac2fdccf9253b599c6a4/v3/40adb5c55b8346041814eef44ddc4d82/yp/p_0_960115/ap1014_us0_mii0w1iw8z2ai2iphcu80ooo2ki81120_pi406_mx64323384_s625321809.mp3',
    singer: '云朵'
  }, {
    id: 3,
    name: '西海情歌',
    collection : '刀郎Ⅲ',
    duration: 343,
    src: 'https://webfs.kugou.com/202410142343/788d9a5888f7f9366d1c0d8c96460444/v3/0e5fb14e78aff13c2def97c814537cb7/yp/p_0_960117/ap1014_us0_mii0w1iw8z2ai2iphcu80ooo2ki81120_pi406_mx32257990_s3395373979.mp3',
    singer: '刀郎'
  }]
</script>

<table>
  <thead>
    <tr>
      <th>歌曲</th>
      <th>歌手</th>
      <th>专辑</th>
      <th>时长</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="m in musics" :key="m.id" style="cursor:pointer;" @click="toggle(m)">
      <td>
        <span>{{ m.name }}</span>
      </td>
      <td>{{ m.singer }}</td>
      <td>{{ m.collection }}</td>
      <td>{{ formatSeconds(m.duration) }}</td>
    </tr>
  </tbody>
</table>
<hr />
<div class="audio-controls-panel">
  <div class="controls-left">
    <Icon class="prev-next-btn left-btn" icon="icomoon-free:previous" />
    <Icon class="left-btn play-btn" icon="icomoon-free:play2" />
    <Icon class="left-btn play-btn" icon="icomoon-free:pause" />
    <Icon class="prev-next-btn left-btn" icon="icomoon-free:next" />
  </div>
  <img class="audio-cover" />
  <Progress></Progress>
</div>
