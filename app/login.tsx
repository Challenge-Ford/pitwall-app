import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
  ActivityIndicator, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { Colors } from '@/constants/Colors';

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1400);
  };

  const fillDemo = () => {
    setValue('email', 'demo@ford.com.br');
    setValue('password', 'demo1234');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />

      <View style={styles.hero}>
        <Image
          source={require('@/assets/images/fordlogo.png')}
          style={styles.logo}
        />
        <Text style={styles.appName}>Torque</Text>
        <Text style={styles.tagline}>FIAP + Ford · Pós-Venda Inteligente</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Entrar na conta</Text>
        <Text style={styles.cardSub}>Acesso exclusivo para consultores da rede Ford</Text>

        {/* E-mail */}
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'E-mail obrigatório',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'E-mail inválido',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                <Ionicons name="mail-outline" size={18} color={errors.email ? Colors.danger : Colors.gray500} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="E-mail corporativo"
                  placeholderTextColor={Colors.gray300}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </>
          )}
        />

        {/* Senha */}
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Senha obrigatória',
            minLength: { value: 6, message: 'Mínimo 6 caracteres' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                <Ionicons name="lock-closed-outline" size={18} color={errors.password ? Colors.danger : Colors.gray500} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Senha"
                  placeholderTextColor={Colors.gray300}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!showPass}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPass(s => !s)} style={styles.eyeBtn}>
                  <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={18} color={Colors.gray500} />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </>
          )}
        />

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.loginBtn, loading && { opacity: 0.8 }]}
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.85}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color={Colors.white} />
            : <Text style={styles.loginBtnText}>Entrar</Text>
          }
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>acesso rápido</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.demoBtn} onPress={fillDemo} activeOpacity={0.75}>
          <Ionicons name="flash-outline" size={15} color={Colors.fordLightBlue} />
          <Text style={styles.demoBtnText}>Preencher credenciais (DEMO)</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>© FIAP + Ford</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.fordBlue },
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 20, gap: 10 },
  logo: { width: 120, height: 60 },
  appName: { fontSize: 42, fontWeight: '900', color: Colors.white, letterSpacing: 0 },
  tagline: { fontSize: 13, color: Colors.white + 'BB', fontWeight: '500', letterSpacing: 0.3 },
  card: { backgroundColor: Colors.white, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 28, paddingBottom: 36 },
  cardTitle: { fontSize: 22, fontWeight: '800', color: Colors.black, marginBottom: 4 },
  cardSub: { fontSize: 13, color: Colors.gray500, marginBottom: 20 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gray100, borderRadius: 12, paddingHorizontal: 14, marginBottom: 4, borderWidth: 1.5, borderColor: Colors.gray200 },
  inputError: { borderColor: Colors.danger },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, fontSize: 15, color: Colors.black },
  eyeBtn: { padding: 4 },
  errorText: { fontSize: 12, color: Colors.danger, marginBottom: 10, marginLeft: 4 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 22, marginTop: 6 },
  forgotText: { fontSize: 13, color: Colors.fordLightBlue, fontWeight: '600' },
  loginBtn: { backgroundColor: Colors.fordBlue, borderRadius: 14, height: 52, alignItems: 'center', justifyContent: 'center', marginBottom: 20, shadowColor: Colors.fordBlue, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 6 },
  loginBtnText: { fontSize: 16, fontWeight: '800', color: Colors.white, letterSpacing: 0.5 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.gray200 },
  dividerText: { fontSize: 11, color: Colors.gray300, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  demoBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 1.5, borderColor: Colors.fordLightBlue + '55', borderRadius: 12, paddingVertical: 12, backgroundColor: Colors.fordLightBlue + '08' },
  demoBtnText: { fontSize: 13, color: Colors.fordLightBlue, fontWeight: '600' },
  footer: { textAlign: 'center', fontSize: 10, color: Colors.white + '55', paddingVertical: 14, letterSpacing: 0.3 },
});