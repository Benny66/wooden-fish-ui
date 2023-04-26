!function() {
    getApp();
    var t = "", e = "";
    Page({
        data: {
            auto: !1,
            count: 0,
            audio: !0
        },
        onShow: function() {
            if (wx.showShareMenu({
                withShareTicket: !1,
                menus: [ "shareAppMessage", "shareTimeline" ]
            }), wx.getStorageSync("sb" + this.getCurrentDate())) console.log(wx.getStorageSync("sb" + this.getCurrentDate())), 
            this.setData({
                count: wx.getStorageSync("sb" + this.getCurrentDate())
            }); else for (let t = -1; t > -3; t--) wx.removeStorageSync("sb" + this.getCurrentDate(t));
        },
        resetcount: function() {
            var t = this;
            wx.showModal({
                title: "提示",
                content: "是否重置数据？",
                success: function(e) {
                    e.confirm ? (wx.getStorageSync("sb" + t.getCurrentDate()) && wx.removeStorageSync("sb" + t.getCurrentDate()), 
                    t.setData({
                        count: 0
                    })) : e.cancel && (console.log("用户点击取消"), wx.reportEvent("refresh", {
                        yesno: "no"
                    }));
                }
            });
        },
        openaudio: function() {
            this.setData({
                audio: !this.data.audio
            }), this.data.audio || this.innerAudioContext.stop();
        },
        onLoad: function() {
            var n = this;
            getApp().videoid && wx.createRewardedVideoAd && ((e = wx.createRewardedVideoAd({
                adUnitId: getApp().videoid
            })).onLoad(function() {}), e.onError(function(t) {}), e.onClose(function(t) {
                t && t.isEnded ? n.overvideo() : wx.showToast({
                    title: "完整看完才能解锁哦~",
                    icon: "none"
                });
            })), getApp().interid && (wx.createInterstitialAd && ((t = wx.createInterstitialAd({
                adUnitId: getApp().interid
            })).onLoad(function() {}), t.onError(function(t) {}), t.onClose(function() {})), 
            setTimeout(function() {
                t && t.show().catch(function(t) {
                    console.error(t);
                });
            }, 2e3)), this.innerAudioContext = wx.createInnerAudioContext(), this.innerAudioContext.src = "audio/songbo.mp3", 
            this.innerAudioContext.onPlay(function() {}), this.innerAudioContext.onError(function(t) {
                console.log(t.errMsg), console.log(t.errCode);
            }), this.aniamtion = wx.createAnimation({
                duration: 50,
                transformOrigin: "right top",
                timingFunction: "ease-in-out"
            });
            for (var o = 0; o < 10; o++) this["agd" + o] = wx.createAnimation({
                duration: 1e3,
                transformOrigin: "right top",
                timingFunction: "ease"
            });
        },
        overvideo: function() {
            wx.setStorageSync("my-key", this.getCurrentDate()), this.konck(), this.timer = setInterval(this.konck, 12e3), 
            this.setData({
                auto: !0
            });
        },
        onHide: function() {
            this.innerAudioContext.stop(), this.timer && clearInterval(this.timer), this.setData({
                auto: !1
            });
        },
        konck: function() {
            this.innerAudioContext.stop(), this.data.audio && this.innerAudioContext.play();
            var t = "" + this.data.count, e = t.substr("" + t.length - 1);
            console.log(e);
            var n = [ "agd" + e ];
            this["agd" + e].top("51%").step().top("40%").opacity(1).step(50).opacity(0).step().step().top("51%"), 
            this.setData({
                [n]: this["agd" + e].export()
            }), this.aniamtion.rotate(25).step().rotate(-25).step(), this.setData({
                animationData: this.aniamtion.export()
            }), this.setData({
                count: this.data.count + 1
            }), wx.setStorageSync("sb" + this.getCurrentDate(), this.data.count);
        },
        autoplay: function() {
            var t = this;
            return this.data.auto ? (this.timer && clearInterval(this.timer), this.setData({
                auto: !1
            }), !1) : wx.getStorageSync("my-key") && wx.getStorageSync("my-key") == this.getCurrentDate() ? (this.overvideo(), 
            !1) : void (e ? wx.showModal({
                title: "未解锁",
                content: "看一段视频，可在今天无限使用此功能",
                confirmColor: "#439057",
                success: function(n) {
                    n.confirm && e && e.show().catch(function() {
                        e.load().then(function() {
                            return e.show();
                        }).catch(function(e) {
                            console.log("激励视频 广告显示失败"), t.timer = setInterval(t.konck, 12e3), t.setData({
                                auto: !0
                            });
                        });
                    });
                }
            }) : (t.timer = setInterval(t.konck, 12e3), t.setData({
                auto: !0
            })));
        },
        getCurrentDate: function(t = 0) {
            const e = new Date();
            e.setDate(e.getDate() + t);
            const n = {
                year: e.getFullYear(),
                month: e.getMonth() + 1,
                date: e.getDate()
            };
            return n.year + "" + (n.month >= 10 ? n.month : "0" + n.month) + (n.date >= 10 ? n.date : "0" + n.date);
        },
        onShareAppMessage: function() {
            return {
                title: wx.getStorageSync("sb" + this.getCurrentDate()) ? "今日我已功德+" + wx.getStorageSync("sb" + this.getCurrentDate()) + "，你也一起来颂钵静心吧！" : "我发现了一款不错的解压神器！快来试一试吧！",
                path: "pages/songbo/index",
                imageUrl: "/images/share.jpg"
            };
        },
        onShareTimeline: function() {
            return {
                title: wx.getStorageSync("sb" + this.getCurrentDate()) ? "今日我已功德+" + wx.getStorageSync("sb" + this.getCurrentDate()) + "，你也一起来颂钵静心吧！" : "我发现了一款不错的解压神器！快来试一试吧！",
                imageUrl: "/images/share.jpg",
                query: {
                    path: "songbo"
                }
            };
        },
        onAddToFavorites: function(t) {
            return {
                title: "静心颂钵",
                imageUrl: "/images/share.jpg",
                query: {
                    path: "songbo"
                }
            };
        }
    });
}();